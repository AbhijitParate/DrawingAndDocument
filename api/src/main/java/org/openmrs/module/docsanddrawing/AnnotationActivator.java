/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.docsanddrawing;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.*;
import org.openmrs.api.ConceptService;
import org.openmrs.api.EncounterService;
import org.openmrs.api.context.Context;
import org.openmrs.module.BaseModuleActivator;
//import org.openmrs.module.htmlformentry.HtmlFormEntryService;

import java.util.Locale;

/**
 * This class contains the logic that is run every time this module is either started or shutdown
 */
public class AnnotationActivator extends BaseModuleActivator {
	
	private Log log = LogFactory.getLog(this.getClass());
	
	@Override
	public void contextRefreshed() {
		log.info("contextRefreshed");
	}
	
	@Override
	public void started() {
		
		updateConceptsAndEncounters();
		
		//		if (ModuleFactory.isModuleStarted("htmlformentry")) {
		//			HtmlFormEntryService htmlFormEntryService = Context.getService(HtmlFormEntryService.class);
		//			htmlFormEntryService.addHandler(Constants.MODULE_TAG, new DrawingTagHandler());
		//		}
		log.info("started");
	}
	
	private void updateConceptsAndEncounters() {
		
		// Concepts Complex
		addConcept(Constants.ObsType.FILE, Constants.ConceptUUID.FILE);
		addConcept(Constants.ObsType.SVG, Constants.ConceptUUID.SVG);
		addConcept(Constants.ObsType.IMAGE, Constants.ConceptUUID.IMAGE);
		addConcept(Constants.ObsType.AUDIO, Constants.ConceptUUID.AUDIO);
		addConcept(Constants.ObsType.VIDEO, Constants.ConceptUUID.VIDEO);
		addConcept(Constants.ObsType.NOTE, Constants.ConceptUUID.NOTE);
		
		// Encounter Type
		{
			final String name = Constants.ENCOUNTER_TYPE;
			final String desc = "Encounters used to record visit drawings and related files.";
			final String uuid = Constants.ENCOUNTER_TYPE_UUID;
			
			EncounterService encounterService = Context.getEncounterService();
			EncounterType encounterType = encounterService.getEncounterTypeByUuid(uuid);
			
			if (encounterType == null) {
				encounterType = new EncounterType(name, desc);
				encounterType.setUuid(uuid);
				encounterService.saveEncounterType(encounterType);
			}
		}
	}
	
	private static void addConcept(String obsType, String uuid) {
		final String name = Constants.ObsType.PREFIX + obsType;
		final String desc = "Concept complex for " + obsType + " complex obs.";
		
		ConceptService conceptService = Context.getConceptService();
		
		if (null == conceptService.getConceptByUuid(uuid)) {
			
			ConceptComplex conceptComplex = new ConceptComplex();
			conceptComplex.setUuid(uuid);
			conceptComplex.setHandler("DrawingAndDocObsHandler");
			ConceptName conceptName = new ConceptName(name, Locale.ENGLISH);
			conceptComplex.setFullySpecifiedName(conceptName);
			conceptComplex.setPreferredName(conceptName);
			conceptComplex.setConceptClass(conceptService.getConceptClassByUuid(ConceptClass.QUESTION_UUID));
			conceptComplex.setDatatype(conceptService.getConceptDatatypeByUuid(ConceptDatatype.COMPLEX_UUID));
			conceptComplex.addDescription(new ConceptDescription(desc, Locale.ENGLISH));
			
			conceptService.saveConcept(conceptComplex);
		}
	}
	
	@Override
	public void stopped() {
		//		try {
		//			HtmlFormEntryService htmlFormEntryService = Context.getService(HtmlFormEntryService.class);
		//			htmlFormEntryService.getHandlers().remove(Constants.MODULE_TAG);
		//		}
		//		catch (Exception ex) {
		//			ex.printStackTrace();
		//		}
		log.info("stopped");
	}
	
	@Override
	public void willRefreshContext() {
		log.info("willRefreshContext");
	}
	
	@Override
	public void willStart() {
		log.info("willStart");
	}
	
	@Override
	public void willStop() {
		log.info("willStop");
	}
}
