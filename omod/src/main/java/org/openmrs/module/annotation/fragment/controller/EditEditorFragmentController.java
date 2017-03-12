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

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.Encounter;
import org.openmrs.Patient;
import org.openmrs.Visit;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.ui.framework.fragment.FragmentModel;
import org.openmrs.ui.framework.page.PageRequest;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *  * Controller for a fragment that shows all users  
 */
public class EditEditorFragmentController {
	
	Log log = LogFactory.getLog(getClass());
	
	// TODO: 3/9/2017 Customize for edit only
	public void controller(PageRequest pageRequest, FragmentModel model, @RequestParam(value = "visitId") Visit visit,
	        @RequestParam(value = "patientId") Patient patient, @RequestParam(value = "encounterId") Encounter encounter,
	        UiSessionContext sessionContext) throws Exception {
		log.error("controller triggered");
		model.addAttribute("patientId", patient.getId());
		model.addAttribute("encounter", encounter);
		model.addAttribute("visitId", visit.getId());
		model.addAttribute("providerId", sessionContext.getCurrentProvider().getId());
		model.addAttribute("returnUrl",
		    "/openmrs/coreapps/patientdashboard/patientDashboard.page?patientId=" + patient.getId());
	}
}
