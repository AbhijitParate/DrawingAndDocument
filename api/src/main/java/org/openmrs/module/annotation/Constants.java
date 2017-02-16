package org.openmrs.module.annotation;

/**
 * Created by abhijit on 2/8/17.
 *
 */
public class Constants {

	public static final String MODULE_NAME = "DrawingAndDocs";

	public static final String MODULE_ARTIFACT_ID = "annotation";

	public static final String ENCOUNTER_TYPE = "Drawings & Docs";
	public static final String ENCOUNTER_UUID = "43c25184-f41f-11e6-bc64-92361f002671";

	static class ObsType {
		public static final String DEFAULT 	= MODULE_ARTIFACT_ID + ".DEFAULT";
		public static final String SVG 		= MODULE_ARTIFACT_ID + ".SVG";
		public static final String IMAGE 	= MODULE_ARTIFACT_ID + ".IMAGE";
		public static final String VIDEO 	= MODULE_ARTIFACT_ID + ".VIDEO";
		public static final String NOTE 	= MODULE_ARTIFACT_ID + ".NOTE";
		public static final String AUDIO 	= MODULE_ARTIFACT_ID + ".AUDIO";
		public static final String FILE 	= MODULE_ARTIFACT_ID + ".FILE";
	}

	static class ConceptUUID {
		public static final String DEFAULT 	= "5118786a-f41d-11e6-bc64-92361f002671";
		public static final String SVG 		= "51187acc-f41d-11e6-bc64-92361f002671";
		public static final String IMAGE 	= "51187bc6-f41d-11e6-bc64-92361f002671";
		public static final String VIDEO 	= "51187c98-f41d-11e6-bc64-92361f002671";
		public static final String NOTE 	= "51187d6a-f41d-11e6-bc64-92361f002671";
		public static final String AUDIO 	= "51188030-f41d-11e6-bc64-92361f002671";
		public static final String FILE 	= "5118810c-f41d-11e6-bc64-92361f002671";
	}
	
	public static final String MODULE_TAG = "DrawingAndAttachments";
	
	public static final String MODULE_BASE_URL = "/" + MODULE_ARTIFACT_ID;
	
	public static final String UPLOAD_DOCUMENT_URL = MODULE_BASE_URL + "/upload";
	
	public static final String DOWNLOAD_DOCUMENT_URL = MODULE_BASE_URL + "/download";
	
}