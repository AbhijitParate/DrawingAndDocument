package org.openmrs.module.annotation.fragment.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.Patient;
import org.openmrs.Visit;
import org.openmrs.api.EncounterService;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.fragment.FragmentConfiguration;
import org.openmrs.ui.framework.fragment.FragmentModel;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * controller for encounter details template
 */
public class EncounterDetailsTemplateFragmentController {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	public void controller(FragmentConfiguration config, FragmentModel model, UiUtils ui,
	        @RequestParam("patientId") Patient patient, @RequestParam("visitId") Visit visit,
	        @SpringBean("encounterService") EncounterService encounterService) {
		
		//		model.addAttribute("patient", patient);
		log.debug("EncounterDetailsTemplateFragmentController called");
		model.put("patient", patient);
		model.put("visit", visit);
		model.put("encounters", visit.getEncounters());
		model.put("custom", "custom data");
	}
}
