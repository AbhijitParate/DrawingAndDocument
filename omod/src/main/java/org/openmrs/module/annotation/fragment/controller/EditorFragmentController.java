/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.annotation.fragment.controller;

import org.openmrs.Patient;
import org.openmrs.Visit;
import org.openmrs.ui.framework.fragment.FragmentModel;
import org.openmrs.ui.framework.page.PageRequest;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *  * Controller for a fragment that shows all users  
 */
public class EditorFragmentController {
	
	public void controller(PageRequest pageRequest, FragmentModel model,
	        @RequestParam(value = "patientId", required = false) Patient patient,
	        @RequestParam(value = "visitId", required = false) Visit visit) throws Exception {
		model.addAttribute("patientId", patient.getId());
		model.addAttribute("visitId", visit.getId());
		model.addAttribute("returnUrl", pageRequest.getRequest().getParameter("returnUrl"));
	}
	
	//	public void controller(PageRequest pageRequest, FragmentModel model,
	//	        @SpringBean("patientService") PatientService patientService,
	//	        @SpringBean("visitService") VisitService visitService) throws Exception {
	//		Patient patient = patientService.getPatientByUuid(pageRequest.getRequest().getParameter("patientId"));
	//		Visit visit = visitService.getVisitByUuid(pageRequest.getRequest().getParameter("visitId"));
	//		String patientId = String.valueOf(patient.getId());
	//		String visitId = String.valueOf(visit.getVisitId());
	//		String returnUrl = pageRequest.getRequest().getParameter("returnUrl");
	//		model.addAttribute("patient", patient);
	//		model.addAttribute("patientId", patientId);
	//		model.addAttribute("visitId", visitId);
	//		model.addAttribute("returnUrl", returnUrl);
	//		model.addAttribute("visit", visit);
	//	}
}
