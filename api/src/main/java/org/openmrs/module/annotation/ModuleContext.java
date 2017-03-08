/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.annotation;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.openmrs.*;
import org.openmrs.api.*;
import org.openmrs.module.annotation.obs.datahelper.ComplexDataHelper;
import org.openmrs.module.emrapi.adt.AdtService;
import org.openmrs.module.emrapi.utils.ModuleProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.*;

import static org.openmrs.module.annotation.Constants.mimeTypes;

/**
 * Inject this class to access services and global properties.
 */
@Component(Constants.Component.MODULE_CONTEXT)
public class ModuleContext extends ModuleProperties {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	@Autowired
	@Qualifier("obsService")
	private ObsService obsService;
	
	@Autowired
	@Qualifier("adtService")
	private AdtService adtService;
	
	@Autowired
	@Qualifier(Constants.Component.COMPLEX_DATA_HELPER)
	protected ComplexDataHelper complexDataHelper;
	
	/*
	 * Exposing all needed services through OUR context
	 */
	
	public ConceptService getConceptService() {
		return conceptService;
	}
	
	public ObsService getObsService() {
		return obsService;
	}
	
	public VisitService getVisitService() {
		return visitService;
	}
	
	public ProviderService getProviderService() {
		return providerService;
	}
	
	public PatientService getPatientService() {
		return patientService;
	}
	
	public EncounterService getEncounterService() {
		return encounterService;
	}
	
	public AdtService getAdtService() {
		return adtService;
	}
	
	public ComplexDataHelper getComplexDataHelper() {
		return complexDataHelper;
	}
	
	public AdministrationService getAdministrationService() {
		return administrationService;
	}
	
	public ConceptComplex getConceptComplex(Constants.ContentType contentType) {
		Map<String, String> map = getMapByGlobalProperty(Constants.GlobalPropertyPIdentifier.CONCEPT_COMPLEX_UUID_MAP);
		log.error("Concept Complex Map " + map.toString());
		Concept concept = getConceptService().getConceptByUuid(map.get(contentType.toString()));
		if (concept != null) {
			log.error("Concept UUID for content type " + concept.getUuid());
			log.error("Concept is not null for content type " + contentType);
			return getConceptService().getConceptComplex(concept.getConceptId());
		}
		log.error("Concept is null for content type " + contentType);
		return getDefaultConceptComplex();
	}
	
	public List<String> getConceptComplexList() {
		List<String> list = Collections.<String> emptyList();
		final String globalPropertyName = Constants.GlobalPropertyPIdentifier.CONCEPT_COMPLEX_UUID_LIST;
		String globalProperty = administrationService.getGlobalProperty(globalPropertyName);
		
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<ArrayList<String>> typeRef = new TypeReference<ArrayList<String>>() {};
		try {
			list = mapper.readValue(globalProperty, typeRef);
		}
		catch (Exception e) {
			log.error("Could not parse global property '" + globalPropertyName + "' into a List<String>.", e);
		}
		return list;
	}
	
	private ConceptComplex getDefaultConceptComplex() {
		String globalPropertyName = Constants.GlobalPropertyPIdentifier.DEFAULT_CONCEPT_COMPLEX_UUID;
		Concept concept = getConceptByGlobalProperty(globalPropertyName);
		log.error("Default Concept UUID for content type " + concept.getUuid());
		ConceptComplex conceptComplex = getConceptService().getConceptComplex(concept.getConceptId());
		if (conceptComplex == null) {
			throw new IllegalStateException("Configuration required: " + globalPropertyName);
		}
		return conceptComplex;
	}
	
	protected Map<String, String> getMapByGlobalProperty(String globalPropertyName) {
		Map<String, String> map = Collections.<String, String> emptyMap();
		String globalProperty = administrationService.getGlobalProperty(globalPropertyName);
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
		TypeReference<HashMap<String, String>> typeRef = new TypeReference<HashMap<String, String>>() {};
		try {
			map = mapper.readValue(globalProperty, typeRef);
		}
		catch (Exception e) {
			log.error("Could not parse global property '" + globalPropertyName + "' into a Map<String, String>.", e);
		}
		return map;
	}
	
	public static Constants.ContentType getContentFamily(String mimeType) {
		Constants.ContentType contentType = Constants.ContentType.DEFAULT;
		if (StringUtils.startsWith(mimeType, "image/")) {
			if (mimeType.contains("svg")) {
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
		} else if (StringUtils.startsWith(mimeType, "application/")) {
			contentType = Constants.ContentType.FILE;
		}
		return contentType;
	}
	
	public Encounter getModuleEncounter(Patient patient, Visit visit, Provider provider) {
		Encounter encounter = new Encounter();
		encounter.setVisit(visit);
		encounter.setEncounterType(getEncounterType());
		encounter.setPatient(visit.getPatient());
		encounter.setLocation(visit.getLocation());
		encounter.setProvider(getEncounterRole(), provider);
		encounter.setEncounterDatetime(new Date());
		encounter = getEncounterService().saveEncounter(encounter);
		return encounter;
	}
	
	private EncounterRole getEncounterRole() {
		EncounterRole unknownRole = getEncounterService().getEncounterRoleByUuid(EncounterRole.UNKNOWN_ENCOUNTER_ROLE_UUID);
		if (unknownRole == null) {
			throw new IllegalStateException("No 'Unknown' encounter role with uuid "
			        + EncounterRole.UNKNOWN_ENCOUNTER_ROLE_UUID + ".");
		}
		return unknownRole;
	}
	
	private EncounterType getEncounterType() {
		return getEncounterTypeByGlobalProperty(Constants.GlobalPropertyPIdentifier.ENCOUNTER_TYPE_UUID);
	}
	
	public static String getExtension(String mimeType) {
		String ext = "bin";
		if (mimeTypes.containsKey(mimeType)) {
			ext = mimeTypes.get(mimeType);
		}
		return ext;
	}
	
	public static String getExtension(String fileName, String mimeType) {
		String ext = FilenameUtils.getExtension(fileName);
		String extFromMimeType = getExtension(mimeType);
		if (!org.apache.commons.lang.StringUtils.isEmpty(ext)) {
			if (ext.length() > 6) { // this is a bit arbitrary, just to discriminate funny named files such as "uiohdz.iuhezuidhuih"
				ext = extFromMimeType;
			}
		} else {
			ext = extFromMimeType;
		}
		return ext;
	}
}
