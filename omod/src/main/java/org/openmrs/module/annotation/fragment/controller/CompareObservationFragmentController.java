package org.openmrs.module.annotation.fragment.controller;

import org.openmrs.Encounter;
import org.openmrs.Patient;
import org.openmrs.Visit;
import org.openmrs.api.VisitService;
import org.openmrs.module.annotation.web.controller.parser.Parser;
import org.openmrs.ui.framework.SimpleObject;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by abhij on 2/23/2017.
 */
@Deprecated
public class CompareObservationFragmentController {
	
	public static final String VISIT = "visits";
	
	public static final String ENCOUNTERS = "encounters";
	
	public static final String OBSERVATIONS = "observations";
	
	public SimpleObject getVisits(@RequestParam("patientId") Patient patient,
	        @SpringBean("visitService") VisitService visitService) {
		return SimpleObject.create(VISIT, Parser.parseVisits(patient, visitService));
	}
	
	public SimpleObject getEncounters(@RequestParam("visitId") Visit visit) {
		return SimpleObject.create(ENCOUNTERS, Parser.parseEncounters(visit));
	}
	
	public SimpleObject getObservations(@RequestParam("encounterId") Encounter encounter) {
		return SimpleObject.create(OBSERVATIONS, Parser.parseAllObservations(encounter));
	}
	
}
