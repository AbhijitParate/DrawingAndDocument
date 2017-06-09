package org.openmrs.module.annotation.web.controller.parser;

import org.openmrs.Encounter;
import org.openmrs.Obs;
import org.openmrs.Patient;
import org.openmrs.Visit;
import org.openmrs.api.VisitService;
import org.openmrs.module.annotation.obs.data.ModuleComplexData;
import org.openmrs.ui.framework.SimpleObject;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

public class Parser {

    /**
     * get observations list
     * @param encounter
     * @return
     */
	public static ParsedObs parseObservations(Encounter encounter) {
		
		ParsedObs parsedObs = new ParsedObs();
		
		for (Obs obs : encounter.getObsAtTopLevel(false)) {
			
			if (obs.getComment().contains("svg")) {
				parsedObs.setDrawing(parseObs(obs));
				continue;
			}
			SimpleObject simpleObject = parseObs(obs);
			parsedObs.getObs().add(simpleObject);
		}
		
		Collections.sort(parsedObs.getObs(), new Comparator<SimpleObject>() {
			
			@Override
			public int compare(SimpleObject o1, SimpleObject o2) {
				return (Integer) o1.get("obsId") < (Integer) o2.get("obsId") ? -1 : 1;
			}
		});
		
		return parsedObs;
	}

    /**
     * Generate JSON object
     * @param obs
     * @return
     */
	private static SimpleObject parseObs(Obs obs) {
		
		SimpleObject simpleObject = SimpleObject.create("obsId", obs.getObsId());
		simpleObject.put("uuid", obs.getUuid());
		
		simpleObject.put("name", obs.getComment());
		if (obs.getComplexData() instanceof ModuleComplexData) {
			simpleObject.put("obsType", ((ModuleComplexData) obs.getComplexData()).getObsType());
			simpleObject.put("mimeType", ((ModuleComplexData) obs.getComplexData()).getMimeType());
		}
		return simpleObject;
		
	}

    /**
     * Get list of visits
     * @param patient
     * @param visitService
     * @return
     */
	public static java.util.List<SimpleObject> parseVisits(Patient patient, VisitService visitService) {
		
		List<SimpleObject> visits = new LinkedList<SimpleObject>();
		
		for (Visit v : visitService.getVisitsByPatient(patient)) {
			SimpleObject object = new SimpleObject();
			object.put("id", v.getId());
			object.put("type", v.getVisitType().getName());
			object.put("location", v.getLocation().getDisplayString());
			object.put("startDate", v.getStartDatetime());
			object.put("stopDate", v.getStopDatetime());
			visits.add(object);
		}
		
		return visits;
	}

    /**
     * Get list of encounters
     * @param visit
     * @return
     */
	public static java.util.List<SimpleObject> parseEncounters(Visit visit) {
		
		List<SimpleObject> encounters = new LinkedList<SimpleObject>();
		
		for (Encounter e : visit.getEncounters()) {
			SimpleObject object = new SimpleObject();
			object.put("id", e.getId());
			object.put("type", e.getEncounterType().getName());
			object.put("date", e.getEncounterDatetime());
			encounters.add(object);
		}
		
		return encounters;
		
	}

    /**
     * Get list of observations
     * @param encounter
     * @return
     */
	public static List<SimpleObject> parseAllObservations(Encounter encounter) {
		
		List<SimpleObject> observations = new LinkedList<SimpleObject>();
		
		for (Obs obs : encounter.getObsAtTopLevel(false)) {
			SimpleObject object = new SimpleObject();
			object.put("id", obs.getId());
			object.put("uuid", obs.getUuid());
			object.put("concept", obs.getConcept().getName().getName());
			object.put("value_text", obs.getValueText());
			object.put("value_numeric", obs.getValueNumeric());
			object.put("comment", obs.getComment());
			if (obs.getComplexData() instanceof ModuleComplexData) {
				object.put("obsType", ((ModuleComplexData) obs.getComplexData()).getObsType());
				object.put("mimeType", ((ModuleComplexData) obs.getComplexData()).getMimeType());
			}
			observations.add(object);
		}
		
		return observations;
	}
	
}
