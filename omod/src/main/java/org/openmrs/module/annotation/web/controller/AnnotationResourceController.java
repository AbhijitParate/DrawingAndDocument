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
import org.json.JSONObject;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.v1_0.controller.MainResourceController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/rest/" + RestConstants.VERSION_1 + "/drawing")
public class AnnotationResourceController extends MainResourceController {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	@RequestMapping(value = "/test/{obsUuid}/{fileName:.+}", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject onGet(@PathVariable(value = "obsUuid") String obsUuid,
	        @PathVariable(value = "fileName") String fileName, @RequestParam(value = "view", required = false) String view,
	        HttpServletResponse response) throws JSONException {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("obsUuid", obsUuid);
		jsonObject.put("fileName", fileName);
		jsonObject.put("view", view);
		log.info(jsonObject.toString());
		return jsonObject;
	}
	
	@Override
	public String getNamespace() {
		return "v1/annotation";
	}
}
