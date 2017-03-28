package org.openmrs.module.annotation.obs.handler;

import org.openmrs.Obs;
import org.openmrs.module.annotation.obs.data.ModuleComplexData;
import org.openmrs.module.annotation.obs.data.ValueComplex;
import org.openmrs.obs.ComplexData;
import org.openmrs.obs.handler.AbstractHandler;
import org.openmrs.obs.handler.BinaryStreamHandler;

import java.io.File;

@Deprecated
public class DefaultObsHandler extends AbstractComplexObsHandler {
	
	public DefaultObsHandler() {
		super();
		log.error(getClass().getName() + ".DefaultObsHandler()");
	}
	
	@Override
	protected void setParentComplexObsHandler() {
		log.error(getClass().getName() + ".setParentComplexObsHandler()");
		setComplexObsHandler(new BinaryStreamHandler());
	}
	
	@Override
	protected ComplexData readComplexData(Obs obs, ValueComplex valueComplex, String view) {
		log.error(getClass().getName() + ".readComplexData()");
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
		tmpObs = getComplexObsHandler().getObs(tmpObs, "RAW_VIEW");
		complexData = tmpObs.getComplexData();
		//        }
		
		// Then we build our own custom complex data
		return getComplexDataHelper().build(complexData.getTitle(), complexData.getData(), valueComplex.getMimeType())
		        .asComplexData();
	}
	
	@Override
	protected boolean deleteComplexData(Obs obs, ModuleComplexData moduleComplexData) {
		log.error(getClass().getName() + ".deleteComplexData()");
		// We use a temp obs whose value complex points to the file name
		Obs tmpObs = new Obs();
		tmpObs.setValueComplex(moduleComplexData.asComplexData().getTitle()); // Temp obs used as a safety
		return getComplexObsHandler().purgeComplexData(tmpObs);
	}
	
	@Override
	protected ValueComplex saveComplexData(Obs obs, ModuleComplexData moduleComplexData) {
		log.error(getClass().getName() + ".saveComplexData()");
		// We invoke the parent to inherit from the file saving routines.
		obs = getComplexObsHandler().saveObs(obs);
		
		File savedFile = AbstractHandler.getComplexDataFile(obs);
		String savedFileName = savedFile.getName();
		
		return new ValueComplex(moduleComplexData.getObsType(), savedFileName, moduleComplexData.getMimeType());
	}
}
