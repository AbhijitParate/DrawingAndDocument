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

import java.text.SimpleDateFormat;

/**
 *  * Controller for a fragment that edits encounter  
 */
public class EditEditorFragmentController {
	
	Log log = LogFactory.getLog(getClass());

	public void controller(PageRequest pageRequest,
                           FragmentModel model,
                           @RequestParam(value = "visitId") Visit visit,
                           @RequestParam(value = "patientId") Patient patient,
                           @RequestParam(value = "encounterId") Encounter encounter,
                           UiSessionContext sessionContext) throws Exception {
		log.debug("controller triggered");
		model.addAttribute("patientId", patient.getId());
		model.addAttribute("encounterId", encounter.getId());
		SimpleDateFormat sdf = new SimpleDateFormat("h:mm a");
		model.addAttribute("encounterTime", sdf.format(encounter.getEncounterDatetime()));
		sdf = new SimpleDateFormat("EEE, d MMM yyyy");
		model.addAttribute("encounterDate", sdf.format(encounter.getEncounterDatetime()));
		model.addAttribute("visitId", visit.getId());
		model.addAttribute("providerId", sessionContext.getCurrentProvider().getId());
		model.addAttribute("returnUrl",
		    "/openmrs/coreapps/patientdashboard/patientDashboard.page?patientId=" + patient.getId());
	}
}
