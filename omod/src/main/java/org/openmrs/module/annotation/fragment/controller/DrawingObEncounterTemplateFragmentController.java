package org.openmrs.module.annotation.fragment.controller;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.node.ObjectNode;
import org.openmrs.Encounter;
import org.openmrs.EncounterType;
import org.openmrs.Patient;
import org.openmrs.Visit;
import org.openmrs.api.EncounterService;
import org.openmrs.api.context.Context;
import org.openmrs.module.appframework.domain.AppDescriptor;
import org.openmrs.module.coreapps.EncounterServiceCompatibility;
import org.openmrs.ui.framework.SimpleObject;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.annotation.FragmentParam;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.fragment.FragmentConfiguration;
import org.openmrs.ui.framework.fragment.FragmentModel;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by abhij on 2/23/2017. \
 */
public class DrawingObEncounterTemplateFragmentController {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	public void controller(FragmentConfiguration config, FragmentModel model, UiUtils ui,
	        @RequestParam("patientId") Patient patient, @RequestParam("visitId") Visit visit,
	        @SpringBean("encounterService") EncounterService encounterService) {
		
		//		model.addAttribute("patient", patient);
		log.error("DrawingObEncounterTemplateFragmentController called");
		model.put("patient", patient);
		model.put("visit", visit);
		model.put("encounters", visit.getEncounters());
		model.put("custom", "custom data");
	}
}
