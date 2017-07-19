package org.openmrs.module.docsanddrawing.fragment.controller;

import org.openmrs.Patient;
import org.openmrs.Visit;
import org.openmrs.ui.framework.fragment.FragmentModel;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * controller for encounter details template
 */
public class EncounterDetailsTemplateFragmentController {
	
	//	protected final Log log = LogFactory.getLog(getClass());
	
	public void controller(FragmentModel model, @RequestParam("patientId") Patient patient,
	        @RequestParam("visitId") Visit visit) {
		
		//		model.addAttribute("patient", patient);
		//		log.debug("EncounterDetailsTemplateFragmentController called");
		model.put("patient", patient);
		model.put("visit", visit.getId());
		model.put("encounters", visit.getEncounters());
		model.put("custom", "custom data");
	}
}
