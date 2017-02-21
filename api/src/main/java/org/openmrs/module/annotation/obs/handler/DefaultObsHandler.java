package org.openmrs.module.annotation.obs.handler;

import org.openmrs.Obs;
import org.openmrs.api.APIException;
import org.openmrs.module.annotation.obs.data.ModuleComplexData;
import org.openmrs.module.annotation.obs.data.ValueComplex;
import org.openmrs.obs.ComplexData;
import org.openmrs.obs.handler.AbstractHandler;
import org.openmrs.obs.handler.BinaryDataHandler;
import org.openmrs.obs.handler.BinaryStreamHandler;

import java.io.File;

/**
 * Created by abhijit on 2/16/17.
 */
public class DefaultObsHandler extends AbstractComplexObsHandler {
	
	/** The Constant HANDLER_TYPE. Used to differentiate between handler types */
	public static final String HANDLER_TYPE = "DefaultObsHandler";
	
	/** The Constant DISPLAY_LINK. Used as a link to display the selected patient */
	public static final String DISPLAY_LINK = "/patientDashboard.form?patientId=";
	
	public DefaultObsHandler() {
		super();
	}
	
	@Override
	protected void setParentComplexObsHandler() {
		setParent(new BinaryStreamHandler());
	}
	
	@Override
	protected ComplexData readComplexData(Obs obs, ValueComplex valueComplex, String view) {
		// We invoke the parent to inherit from the file reading routines.
		Obs tmpObs = new Obs();
		tmpObs.setValueComplex(valueComplex.getFileName()); // Temp obs used as a safety
		
		ComplexData complexData;
		//        if (view.equals(VisitDocumentsConstants.DOC_VIEW_THUMBNAIL)) {
		//            // This handler doesn't have data for thumbnails, we return a null content
		//            complexData = new ComplexData(valueComplex.getFileName(), null);
		//        }
		//        else {
		// BinaryDataHandler doesn't handle several views
		tmpObs = getParent().getObs(tmpObs, "RAW_VIEW");
		complexData = tmpObs.getComplexData();
		//        }
		
		// Then we build our own custom complex data
		return getComplexDataHelper().build(complexData.getTitle(), complexData.getData(), valueComplex.getMimeType(),
		    valueComplex.getInstructions()).asComplexData();
	}
	
	@Override
	protected boolean deleteComplexData(Obs obs, ModuleComplexData moduleComplexData) {
		// We use a temp obs whose value complex points to the file name
		Obs tmpObs = new Obs();
		tmpObs.setValueComplex(moduleComplexData.asComplexData().getTitle()); // Temp obs used as a safety
		return getParent().purgeComplexData(tmpObs);
	}
	
	@Override
	protected ValueComplex saveComplexData(Obs obs, ModuleComplexData moduleComplexData) {
		// We invoke the parent to inherit from the file saving routines.
		obs = getParent().saveObs(obs);
		
		File savedFile = AbstractHandler.getComplexDataFile(obs);
		String savedFileName = savedFile.getName();
		
		return new ValueComplex(moduleComplexData.getInstruction(), moduleComplexData.getMimeType(), savedFileName);
	}
}
