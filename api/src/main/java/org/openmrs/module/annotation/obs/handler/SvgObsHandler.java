package org.openmrs.module.annotation.obs.handler;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.Obs;
import org.openmrs.api.APIException;
import org.openmrs.module.annotation.obs.data.ModuleComplexData;
import org.openmrs.module.annotation.obs.data.ValueComplex;
import org.openmrs.obs.ComplexData;
import org.openmrs.obs.handler.AbstractHandler;
import org.openmrs.obs.handler.BinaryStreamHandler;
import org.openmrs.obs.handler.ImageHandler;

import java.io.File;

/**
 * Created by abhijit on 2/16/17.
 */
public class SvgObsHandler extends AbstractComplexObsHandler {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	public SvgObsHandler() {
		super();
	}
	
	@Override
	protected void setParentComplexObsHandler() {
		setParent(new BinaryStreamHandler());
	}
	
	@Override
	protected ComplexData readComplexData(Obs obs, ValueComplex valueComplex, String view) {
		String fileName = valueComplex.getFileName();
		//        if (view.equals(VisitDocumentsConstants.DOC_VIEW_THUMBNAIL)) {
		//            fileName = buildThumbnailFileName(fileName);
		//        }
		
		// We invoke the parent to inherit from the file reading routines.
		Obs tmpObs = new Obs();
		tmpObs.setValueComplex(fileName); // Temp obs used as a safety
		tmpObs = getParent().getObs(tmpObs, "RAW_VIEW"); // ImageHandler doesn't handle several views
		ComplexData complexData = tmpObs.getComplexData();
		
		// Then we build our own custom complex data
		return getComplexDataHelper().build(complexData.getTitle(), complexData.getData(), valueComplex.getMimeType(),
		    valueComplex.getInstructions()).asComplexData();
	}
	
	@Override
	protected boolean deleteComplexData(Obs obs, ModuleComplexData moduleComplexData) {
		// We use a temp obs whose complex data points to the file names
		String fileName = moduleComplexData.getTitle();
		//        String thumbnailFileName = buildThumbnailFileName(fileName);
		
		Obs tmpObs = new Obs();
		//        tmpObs.setValueComplex(thumbnailFileName);
		//        boolean isThumbNailPurged = getParent().purgeComplexData(tmpObs);
		tmpObs.setValueComplex(fileName);
		return getParent().purgeComplexData(tmpObs);
		//        boolean isImagePurged = getParent().purgeComplexData(tmpObs);
		
		//        return isThumbNailPurged && isImagePurged;
	}
	
	@Override
	protected ValueComplex saveComplexData(Obs obs, ModuleComplexData moduleComplexData) {
		// We invoke the parent to inherit from the file saving routines.
		obs = getParent().saveObs(obs);
		
		File savedFile = AbstractHandler.getComplexDataFile(obs);
		log.error("File saved" + savedFile.getName());
		String savedFileName = savedFile.getName();
		
		// Saving the thumbnail
		//        File dir = savedFile.getParentFile();
		//        String thumbnailFileName = buildThumbnailFileName(savedFileName);
		//        try {
		//            Thumbnails.of(savedFile.getAbsolutePath()).size(THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH).toFile( new File(dir, thumbnailFileName) );
		//        } catch (IOException e) {
		//            getParent().purgeComplexData(obs);
		//            throw new APIException("A thumbnail file could not be saved for obs with"
		//                    + "OBS_ID='" + obs.getObsId() + "', "
		//                    + "FILE='" + docComplexData.getTitle() + "'.", e);
		//        }
		return new ValueComplex(moduleComplexData.getInstruction(), moduleComplexData.getMimeType(), savedFileName);
	}
}
