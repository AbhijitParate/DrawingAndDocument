/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.docsanddrawing.fragment.controller;

import org.openmrs.Patient;
import org.openmrs.Visit;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.ui.framework.fragment.FragmentModel;
import org.openmrs.ui.framework.page.PageRequest;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *  * Controller for a fragment to add new drawing  
 */
public class AddEditorFragmentController {
	
	//	Log log = LogFactory.getLog(getClass());
	
	public void controller(PageRequest pageRequest, FragmentModel model, UiSessionContext sessionContext,
	        @RequestParam(value = "patientId") Patient patient, @RequestParam(value = "visitId") Visit visit)
	        throws Exception {
		//		log.debug(getClass().getSimpleName() + ".controller()");
		model.addAttribute("patientId", patient.getId());
		model.addAttribute("visitId", visit.getId());
		model.addAttribute("providerId", sessionContext.getCurrentProvider().getId());
		//		model.addAttribute("returnUrl", "../coreapps/clinicianfacing/patient.page?patientId="+patient.getId()+"&visitId"+visit.getId());
		//		model.addAttribute("returnUrl", pageRequest.getRequest().getParameter("returnUrl"));
	}
}
