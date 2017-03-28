package org.openmrs.module.annotation.obs.handler;

import org.openmrs.Obs;
import org.openmrs.module.annotation.obs.data.ModuleComplexData;
import org.openmrs.module.annotation.obs.data.ValueComplex;
import org.openmrs.obs.ComplexData;
import org.openmrs.obs.handler.AbstractHandler;
import org.openmrs.obs.handler.BinaryStreamHandler;

import java.io.File;

/**
 * Created by abhijit on 2/16/17.
 */

/**
 * De
 */
@Deprecated
public class ImageObsHandler extends AbstractComplexObsHandler {
	
	public ImageObsHandler() {
		super();
		log.error(getClass().getName() + ".ImageObsHandler()");
	}
	
	@Override
	protected void setParentComplexObsHandler() {
		log.error(getClass().getName() + ".setParentComplexObsHandler()");
		setComplexObsHandler(new BinaryStreamHandler());
	}
	
	@Override
	protected ComplexData readComplexData(Obs obs, ValueComplex valueComplex, String view) {
		log.error(getClass().getName() + ".readComplexData()");
		String fileName = valueComplex.getFileName();
		//        if (view.equals(VisitDocumentsConstants.DOC_VIEW_THUMBNAIL)) {
		//            fileName = buildThumbnailFileName(fileName);
		//        }
		
		// We invoke the parent to inherit from the file reading routines.
		Obs tmpObs = new Obs();
		tmpObs.setValueComplex(fileName); // Temp obs used as a safety
		tmpObs = getComplexObsHandler().getObs(tmpObs, "RAW_VIEW"); // ImageHandler doesn't handle several views
		ComplexData complexData = tmpObs.getComplexData();
		
		// Then we build our own custom complex data
		return getComplexDataHelper().build(complexData.getTitle(), complexData.getData(), valueComplex.getMimeType())
		        .asComplexData();
	}
	
	@Override
	protected boolean deleteComplexData(Obs obs, ModuleComplexData moduleComplexData) {
		log.error(getClass().getName() + ".deleteComplexData()");
		// We use a temp obs whose complex data points to the file names
		String fileName = moduleComplexData.getTitle();
		//        String thumbnailFileName = buildThumbnailFileName(fileName);
		
		Obs tmpObs = new Obs();
		//        tmpObs.setValueComplex(thumbnailFileName);
		//        boolean isThumbNailPurged = getComplexObsHandler().purgeComplexData(tmpObs);
		tmpObs.setValueComplex(fileName);
		return getComplexObsHandler().purgeComplexData(tmpObs);
		//        boolean isImagePurged = getComplexObsHandler().purgeComplexData(tmpObs);
		
		//        return isThumbNailPurged && isImagePurged;
	}
	
	@Override
	protected ValueComplex saveComplexData(Obs obs, ModuleComplexData moduleComplexData) {
		log.error(getClass().getName() + ".saveComplexData()");
		// We invoke the parent to inherit from the file saving routines.
		obs = getComplexObsHandler().saveObs(obs);
		
		File savedFile = AbstractHandler.getComplexDataFile(obs);
		String savedFileName = savedFile.getName();
		
		// Saving the thumbnail
		//        File dir = savedFile.getParentFile();
		//        String thumbnailFileName = buildThumbnailFileName(savedFileName);
		//        try {
		//            Thumbnails.of(savedFile.getAbsolutePath()).size(THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH).toFile( new File(dir, thumbnailFileName) );
		//        } catch (IOException e) {
		//            getComplexObsHandler().purgeComplexData(obs);
		//            throw new APIException("A thumbnail file could not be saved for obs with"
		//                    + "OBS_ID='" + obs.getObsId() + "', "
		//                    + "FILE='" + docComplexData.getTitle() + "'.", e);
		//        }
		return new ValueComplex(moduleComplexData.getObsType(), savedFileName, moduleComplexData.getMimeType());
	}
}
