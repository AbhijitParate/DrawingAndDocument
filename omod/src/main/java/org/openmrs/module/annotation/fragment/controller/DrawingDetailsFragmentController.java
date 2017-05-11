package org.openmrs.module.annotation.fragment.controller;

import org.openmrs.Encounter;
import org.openmrs.module.annotation.web.controller.parser.ParsedObs;
import org.openmrs.module.annotation.web.controller.parser.Parser;
import org.openmrs.ui.framework.SimpleObject;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by abhij on 2/23/2017.
 */
public class DrawingDetailsFragmentController {
	
	public static final String OBSERVATIONS = "obs";
	
	public static final String DRAWING = "drawing";
	
	public SimpleObject getEncounterDetails(@RequestParam("encounterId") Encounter encounter) {
		ParsedObs parsedObs = Parser.parseObservations(encounter);
		
		return SimpleObject.create(DRAWING, parsedObs.getDrawing(), OBSERVATIONS, parsedObs.getObs());
	}
}
