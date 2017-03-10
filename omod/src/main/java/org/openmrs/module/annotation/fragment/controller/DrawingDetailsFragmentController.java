package org.openmrs.module.annotation.fragment.controller;

import org.openmrs.Encounter;
import org.openmrs.api.LocationService;
import org.openmrs.module.annotation.fragment.controller.parser.ParsedObs;
import org.openmrs.module.annotation.fragment.controller.parser.ParserEncounterIntoSimpleObjects;
import org.openmrs.module.emrapi.EmrApiProperties;
import org.openmrs.module.emrapi.disposition.DispositionService;
import org.openmrs.ui.framework.SimpleObject;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by abhij on 2/23/2017.
 */
public class DrawingDetailsFragmentController {
	
	public static final String OBSERVATIONS = "obs";
	
	public static final String DRAWING = "drawing";
	
	public SimpleObject getEncounterDetails(@RequestParam("encounterId") Encounter encounter,
	        @SpringBean("emrApiProperties") EmrApiProperties emrApiProperties,
	        @SpringBean("locationService") LocationService locationService,
	        @SpringBean("dispositionService") DispositionService dispositionService, UiUtils uiUtils) {
		
		ParserEncounterIntoSimpleObjects parserEncounter = new ParserEncounterIntoSimpleObjects(encounter, uiUtils,
		        emrApiProperties, locationService, dispositionService);
		
		ParsedObs parsedObs = parserEncounter.parseObservations(uiUtils.getLocale());
		
		return SimpleObject.create(DRAWING, parsedObs.getDrawing(), OBSERVATIONS, parsedObs.getObs());
	}
	
}
