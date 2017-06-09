/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.annotation.web.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.openmrs.Encounter;
import org.openmrs.module.annotation.web.controller.parser.ParsedObs;
import org.openmrs.module.annotation.web.controller.parser.Parser;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.v1_0.controller.MainResourceController;
import org.openmrs.ui.framework.SimpleObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/rest/" + RestConstants.VERSION_1 + "/annotation/encounter")
public class EncounterController extends MainResourceController {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	public static final String OBSERVATIONS = "obs";
	
	public static final String DRAWING = "drawing";
	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	@ResponseBody
	public SimpleObject onGet(@RequestParam(value = "encounterid") Encounter encounter, HttpServletResponse response)
	        throws JSONException {
		
		ParsedObs parsedObs = Parser.parseObservations(encounter);
		return SimpleObject.create(DRAWING, parsedObs.getDrawing(), OBSERVATIONS, parsedObs.getObs());
	}
	
	@Override
	public String getNamespace() {
		return "v1/annotation";
	}
}