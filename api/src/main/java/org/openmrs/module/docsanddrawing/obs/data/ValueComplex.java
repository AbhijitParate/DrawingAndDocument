package org.openmrs.module.docsanddrawing.obs.data;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.module.docsanddrawing.Constants;
import org.openmrs.module.docsanddrawing.Utils;

/**
 * ValueComplex to be saved as a part of observation
 */
public class ValueComplex {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	private static final String INVALID = "Invalid value";
	
	//	private static final String INSTRUCTION = "Instruction";
	
	//	public static final String INSTRUCTION_NONE = INSTRUCTION + ".none";
	//
	//	public static final String INSTRUCTION_DEFAULT = INSTRUCTION + ".default";
	
	//	protected static final String FILENAME_DEFAULT = MODULE_ID + "_file";
	
	protected String obsType = Constants.MODULE_ID;
	
	protected String mimeType = INVALID;
	
	protected String fileName = Constants.MODULE_ID + "_file.dat";
	
	/**
	 * This is used to identify module's implementation from saved valueComplex.
	 **/
	protected final static String MODULE_OBS_IDENTIFIER = "drawing";
	
	protected final static String SEP = " : ";
	
	/**
	 * Parses the value complex string from db and creates the {@link ValueComplex} object
	 * 
	 * @param valueComplex valueComplex string
	 */
	// 17
	public ValueComplex(String valueComplex) {
		// drawing | docsanddrawing.FILE | application/octet-stream | SampleVideo_640x360_10mb_01.mp4
		if (!isValidModuleValueComplex(valueComplex)) {
			return;
		}
		log.debug(getClass().getName() + ".ValueComplex()");
		String[] values = valueComplex.split(SEP);
		this.obsType = values[1];
		this.fileName = values[2];
		this.mimeType = values[3];
		
		if (!Utils.isValidMimeType(this.mimeType))
			this.mimeType = Constants.UNKNOWN_MIME_TYPE;
	}
	
	/**
	 * Constructor for {@link ValueComplex}
	 * 
	 * @param obsType {@link Constants.ObsType}
	 * @param fileName Name of file with extension
	 * @param mimeType MimeType of file (ref. {@link Constants.ContentType})
	 */
	public ValueComplex(String obsType, String fileName, String mimeType) {
		this(buildValueComplexString(obsType, fileName, mimeType));
	}
	
	@Override
	public String toString() {
		log.debug(getClass().getName() + ".toString()");
		return buildValueComplexString(obsType, fileName, mimeType);
	}
	
	public String getObsType() {
		return obsType;
	}
	
	public String getFileName() {
		return fileName;
	}
	
	public String getMimeType() {
		return mimeType;
	}
	
	/**
	 * @return String - valueComplexString
	 */
	public String getValueComplex() {
		log.debug(getClass().getName() + ".getValueComplex()");
		return buildValueComplexString(obsType, fileName, mimeType);
	}
	
	/**
	 * Statically builds value complex string
	 * 
	 * @param obsType {@link Constants.ObsType}
	 * @param fileName Name of file with extension
	 * @param mimeType MimeType of file (ref. {@link Constants.ContentType})
	 * @return valueComplexString of pattern drawing | obsType | fileName | mimeType
	 */
	private static String buildValueComplexString(String obsType, String fileName, String mimeType) {
		return MODULE_OBS_IDENTIFIER + SEP + obsType + SEP + fileName + SEP + mimeType;
	}
	
	/**
	 * Checks if the ValueComplexString is valid or not
	 * 
	 * @param valueComplex ValueComplexString from db
	 * @return true - if valid module's implementation | false - if invalid
	 */
	public static boolean isValidModuleValueComplex(String valueComplex) {
		String[] values = valueComplex.split(SEP);
		return values.length == 4 && values[0].equals(MODULE_OBS_IDENTIFIER);
	}
}
