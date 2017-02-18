package org.openmrs.module.annotation;

/**
 * Created by abhijit on 2/8/17.
 */
public class Constants {
	
	public static final String MODULE_NAME = "DrawingAndDocs";
	
	public static final String MODULE_ID = "annotation";
	
	public static class Component {
		
		public static final String OBSERVATION_SAVER = MODULE_ID + ".ObservationSaver";
		
		public static final String MODULE_CONTEXT = MODULE_ID + ".ModuleContext";
		
		public static final String COMPLEX_DATA_HELPER = MODULE_ID + ".obs.datahelper.ComplexDataHelper";
	}
	
	public static enum ContentType {
		SVG, IMAGE, VIDEO, AUDIO, NOTE, FILE, DEFAULT
	}
	
	public static class ObsType {
		
		public static final String DEFAULT = MODULE_ID + ".DEFAULT";
		
		public static final String SVG = MODULE_ID + ".SVG";
		
		public static final String IMAGE = MODULE_ID + ".IMAGE";
		
		public static final String VIDEO = MODULE_ID + ".VIDEO";
		
		public static final String NOTE = MODULE_ID + ".NOTE";
		
		public static final String AUDIO = MODULE_ID + ".AUDIO";
		
		public static final String FILE = MODULE_ID + ".FILE";
	}
	
	public static final String ENCOUNTER_TYPE = "Drawings & Docs";
	
	public static final String ENCOUNTER_TYPE_UUID = "43c25184-f41f-11e6-bc64-92361f002671";
	
	public static class ConceptUUID {
		
		public static final String DEFAULT = "5118786a-f41d-11e6-bc64-92361f002671";
		
		public static final String SVG = "51187acc-f41d-11e6-bc64-92361f002671";
		
		public static final String IMAGE = "51187bc6-f41d-11e6-bc64-92361f002671";
		
		public static final String VIDEO = "51187c98-f41d-11e6-bc64-92361f002671";
		
		public static final String NOTE = "51187d6a-f41d-11e6-bc64-92361f002671";
		
		public static final String AUDIO = "51188030-f41d-11e6-bc64-92361f002671";
		
		public static final String FILE = "5118810c-f41d-11e6-bc64-92361f002671";
	}
	
	public static class GlobalPropertyPIdentifier {
		
		public static final String ENCOUNTER_TYPE_UUID = MODULE_ID + ".encounterTypeUuid";
		
		public static final String CONCEPT_COMPLEX_UUID_MAP = MODULE_ID + ".conceptComplexUuidMap";
		
		public static final String DEFAULT_CONCEPT_COMPLEX_UUID = MODULE_ID + ".defaultConceptComplexUuid";
		
		public static final String CONCEPT_COMPLEX_UUID_LIST = MODULE_ID + ".conceptComplexUuidList";
	}
	
	public static final String ENCOUNTER_UUID = "325fbc82-f565-11e6-bc64-92361f002671";
	
	public static final String MODULE_TAG = "DrawingAndAttachments";
	
	public static final String MODULE_BASE_URL = "/" + MODULE_ID;
	
	public static final String UPLOAD_DOCUMENT_URL = MODULE_BASE_URL + "/upload";
	
	public static final String DOWNLOAD_DOCUMENT_URL = MODULE_BASE_URL + "/download";
	
}
