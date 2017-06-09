package org.openmrs.module.annotation.obs.handler;

import org.openmrs.Obs;
import org.openmrs.module.annotation.obs.data.ModuleComplexData;
import org.openmrs.module.annotation.obs.data.ValueComplex;
import org.openmrs.obs.ComplexData;
import org.openmrs.obs.handler.AbstractHandler;
import org.openmrs.obs.handler.BinaryStreamHandler;

import java.io.File;

/**
 * ComplexObsHandler used by Drawing and Docs module for saving the observations.
 */
public class DrawingAndDocObsHandler extends AbstractComplexObsHandler {
	
	/**
	 * Invoked by module activator Constructor for {@link DrawingAndDocObsHandler}
	 */
	public DrawingAndDocObsHandler() {
		super();
		//		log.info(getClass().getName() + ".DrawingAndDocObsHandler()");
	}
	
	/**
	 * Invoked by handler Sets the base complexObsHandler
	 */
	@Override
	protected void setParentComplexObsHandler() {
		//		log.error(getClass().getName() + ".setParentComplexObsHandler()");
		setComplexObsHandler(new BinaryStreamHandler());
	}
	
	/**
	 * Invoked by handler Reads the data from server and returns ComplexDataObject
	 * 
	 * @param obs - observation observation
	 * @param valueComplex - value complex string
	 * @param view - supports only "RAW_VIEW"
	 * @return - ComplexData
	 */
	@Override
	protected ComplexData readComplexData(Obs obs, ValueComplex valueComplex, String view) {
		//		log.info(getClass().getName() + ".readComplexData()");
		// We invoke the parent to inherit from the file reading routines.
		Obs tmpObs = new Obs();
		tmpObs.setValueComplex(valueComplex.getFileName());
		
		ComplexData complexData;
		tmpObs = getComplexObsHandler().getObs(tmpObs, "RAW_VIEW");
		complexData = tmpObs.getComplexData();
		
		return getComplexDataHelper().build(complexData.getTitle(), complexData.getData(), valueComplex.getMimeType())
		        .asComplexData();
	}
	
	/**
	 * Invoked by handler Deletes complex data from server
	 * 
	 * @param obs - observation to delete
	 * @param moduleComplexData - complexData to be deleted
	 * @return - success boolean
	 */
	@Override
	protected boolean deleteComplexData(Obs obs, ModuleComplexData moduleComplexData) {
		//		log.info(getClass().getName() + ".deleteComplexData()");
		// We use a temp obs whose value complex points to the file name
		Obs tmpObs = new Obs();
		tmpObs.setValueComplex(moduleComplexData.asComplexData().getTitle()); // Temp obs used as a safety
		return getComplexObsHandler().purgeComplexData(tmpObs);
	}
	
	/**
	 * Invoked by handler Saves complex data in the server
	 * 
	 * @param obs - observation to be saved
	 * @param moduleComplexData - complex data
	 * @return ValueComplex
	 */
	@Override
	protected ValueComplex saveComplexData(Obs obs, ModuleComplexData moduleComplexData) {
		log.info(getClass().getName() + ".saveComplexData()");
		// We invoke the parent to inherit from the file saving routines.
		obs = getComplexObsHandler().saveObs(obs);
		
		File savedFile = AbstractHandler.getComplexDataFile(obs);
		String savedFileName = savedFile.getName();
		
		return new ValueComplex(moduleComplexData.getObsType(), savedFileName, moduleComplexData.getMimeType());
	}
}
