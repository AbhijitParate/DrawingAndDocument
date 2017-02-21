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

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.*;
import org.openmrs.api.ConceptService;
import org.openmrs.api.EncounterService;
import org.openmrs.api.context.Context;
import org.openmrs.module.BaseModuleActivator;
import org.openmrs.module.ModuleFactory;
import org.openmrs.module.annotation.tag.DrawingTagHandler;
import org.openmrs.module.htmlformentry.HtmlFormEntryService;

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
		
		if (ModuleFactory.isModuleStarted("htmlformentry")) {
			HtmlFormEntryService htmlFormEntryService = Context.getService(HtmlFormEntryService.class);
			htmlFormEntryService.addHandler(Constants.MODULE_TAG, new DrawingTagHandler());
		}
		log.info("started");
	}
	
	private void updateConceptsAndEncounters() {
		
		// Concepts Complex
		{
			final String name = Constants.MODULE_NAME + Constants.ObsType.DEFAULT;
			final String desc = "Concept complex for 'default' complex obs.";
			final String uuid = Constants.ConceptUUID.DEFAULT;
			
			ConceptService conceptService = Context.getConceptService();
			
			if (null == conceptService.getConceptByUuid(uuid)) {
				ConceptComplex conceptComplex = new ConceptComplex();
				conceptComplex.setUuid(uuid);
				conceptComplex.setHandler("defaultObsHandler");
				ConceptName conceptName = new ConceptName(name, Locale.ENGLISH);
				conceptComplex.setFullySpecifiedName(conceptName);
				conceptComplex.setPreferredName(conceptName);
				conceptComplex.setConceptClass(conceptService.getConceptClassByUuid(ConceptClass.QUESTION_UUID));
				conceptComplex.setDatatype(conceptService.getConceptDatatypeByUuid(ConceptDatatype.COMPLEX_UUID));
				conceptComplex.addDescription(new ConceptDescription(desc, Locale.ENGLISH));
				
				conceptService.saveConcept(conceptComplex);
			}
		}
		{
			final String name = Constants.MODULE_NAME + Constants.ObsType.IMAGE;
			final String desc = "Concept complex for 'IMAGE' complex obs.";
			final String uuid = Constants.ConceptUUID.IMAGE;
			
			ConceptService conceptService = Context.getConceptService();
			
			if (null == conceptService.getConceptByUuid(uuid)) {
				
				ConceptComplex conceptComplex = new ConceptComplex();
				conceptComplex.setUuid(uuid);
				conceptComplex.setHandler("imageObsHandler");
				ConceptName conceptName = new ConceptName(name, Locale.ENGLISH);
				conceptComplex.setFullySpecifiedName(conceptName);
				conceptComplex.setPreferredName(conceptName);
				conceptComplex.setConceptClass(conceptService.getConceptClassByUuid(ConceptClass.QUESTION_UUID));
				conceptComplex.setDatatype(conceptService.getConceptDatatypeByUuid(ConceptDatatype.COMPLEX_UUID));
				conceptComplex.addDescription(new ConceptDescription(desc, Locale.ENGLISH));
				
				conceptService.saveConcept(conceptComplex);
			}
		}
		
		{
			final String name = Constants.MODULE_NAME + Constants.ObsType.SVG;
			final String desc = "Concept complex for 'SVG' complex obs.";
			final String uuid = Constants.ConceptUUID.SVG;
			
			ConceptService conceptService = Context.getConceptService();
			
			if (null == conceptService.getConceptByUuid(uuid)) {
				
				ConceptComplex conceptComplex = new ConceptComplex();
				conceptComplex.setUuid(uuid);
				conceptComplex.setHandler("svgObsHandler");
				ConceptName conceptName = new ConceptName(name, Locale.ENGLISH);
				conceptComplex.setFullySpecifiedName(conceptName);
				conceptComplex.setPreferredName(conceptName);
				conceptComplex.setConceptClass(conceptService.getConceptClassByUuid(ConceptClass.QUESTION_UUID));
				conceptComplex.setDatatype(conceptService.getConceptDatatypeByUuid(ConceptDatatype.COMPLEX_UUID));
				conceptComplex.addDescription(new ConceptDescription(desc, Locale.ENGLISH));
				
				conceptService.saveConcept(conceptComplex);
			}
		}
		
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
	
	@Override
	public void stopped() {
		try {
			HtmlFormEntryService htmlFormEntryService = Context.getService(HtmlFormEntryService.class);
			htmlFormEntryService.getHandlers().remove(Constants.MODULE_TAG);
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
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
