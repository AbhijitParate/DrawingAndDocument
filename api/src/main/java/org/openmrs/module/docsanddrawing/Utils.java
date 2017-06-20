package org.openmrs.module.docsanddrawing;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;

/**
 * Created by abhij on 3/9/2017.
 */
public class Utils {
	
	public static String getFileExtension(String fileName) {
		if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0)
			return "." + fileName.substring(fileName.lastIndexOf(".") + 1);
		else
			return "";
	}
	
	public static String getMimeTypeFromExtension(String extension) {
		String mimeType = "application/octet-stream";
		if (Constants.contentTypes.containsKey(extension)) {
			mimeType = Constants.contentTypes.get(extension);
		}
		return mimeType;
	}
	
	public static Constants.ContentType getContentType(String mimeType) {
		
		Constants.ContentType contentType = Constants.ContentType.FILE;
		if (StringUtils.startsWith(mimeType, "image/")) {
			if (mimeType.contains("image/svg+xml")) {
				contentType = Constants.ContentType.SVG;
			} else {
				contentType = Constants.ContentType.IMAGE;
			}
		} else if (StringUtils.startsWith(mimeType, "video/")) {
			contentType = Constants.ContentType.VIDEO;
		} else if (StringUtils.startsWith(mimeType, "audio/")) {
			contentType = Constants.ContentType.AUDIO;
		} else if (StringUtils.startsWith(mimeType, "text/")) {
			contentType = Constants.ContentType.NOTE;
		}
		return contentType;
	}
	
	public static String getExtension(String mimeType) {
		String ext = "bin";
		if (Constants.mimeTypes.containsKey(mimeType)) {
			ext = Constants.mimeTypes.get(mimeType);
		}
		return ext;
	}
	
	public static String getExtension(String fileName, String mimeType) {
		String ext = FilenameUtils.getExtension(fileName);
		String extFromMimeType = getExtension(mimeType);
		if (!org.apache.commons.lang.StringUtils.isEmpty(ext)) {
			if (ext.length() > 6) {
				// this is a bit arbitrary, just to discriminate funny named files such as "uiohdz.iuhezuidhuih"
				ext = extFromMimeType;
			}
		} else {
			ext = extFromMimeType;
		}
		return ext;
	}
	
	/**
	 * @param mimeType mimeType of file
	 * @return String - from {@link Constants.ObsType}
	 */
	public static String getObsTypeFromMimeType(String mimeType) {
		String obsType = Constants.ObsType.FILE;
		if (mimeType.startsWith("image/")) {
			obsType = Constants.ObsType.IMAGE;
			if (mimeType.equals("image/svg+xml"))
				obsType = Constants.ObsType.SVG;
		} else if (mimeType.startsWith("video/")) {
			obsType = Constants.ObsType.VIDEO;
		} else if (mimeType.startsWith("audio/")) {
			obsType = Constants.ObsType.AUDIO;
		} else if (mimeType.startsWith("text/")) {
			obsType = Constants.ObsType.NOTE;
		}
		return obsType;
	}
	
	/**
	 * Checks if the mimeType provided is valid or not from {@link Constants}.mimeTypes
	 * 
	 * @param mimeType String - mimeType
	 * @return true - valid | false - invalid
	 */
	public static boolean isValidMimeType(String mimeType) {
		return Constants.mimeTypes.containsKey(mimeType);
	}
	
	public static boolean isImage(String fileName) {
		String extension = getExtension(fileName);
		for (String s : Constants.TEMPLATE_EXTENSIONS)
			if (extension.toUpperCase().equals(s))
				return true;
		
		return false;
	}
}
