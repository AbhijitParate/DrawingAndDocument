/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.docsanddrawing.web.controller;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;
import org.openmrs.Encounter;
import org.openmrs.Patient;
import org.openmrs.Provider;
import org.openmrs.Visit;
import org.openmrs.module.docsanddrawing.Constants;
import org.openmrs.module.docsanddrawing.ModuleContext;
import org.openmrs.module.docsanddrawing.ObservationSaver;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.util.OpenmrsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Controller("${rootArtifactId}.UploadController")
@RequestMapping(value = "/rest/" + RestConstants.VERSION_1 + "/docsanddrawing/upload")
public class UploadController {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	@Autowired
	@Qualifier(Constants.Component.MODULE_CONTEXT)
	protected ModuleContext moduleContext;
	
	@Autowired
	@Qualifier(Constants.Component.OBSERVATION_SAVER)
	protected ObservationSaver observationSaver;
	
	/**
	 * This methods is not allowed on the controller
	 * 
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public void onGet(HttpServletResponse response) throws IOException {
		response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "Method not allowed.");
	}
	
	/**
	 * Extract parameters for post
	 * 
	 * @param request
	 * @param files
	 * @param fileNames
	 * @param previousObs
	 * @param patient
	 * @param visit
	 * @param providerId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public String onPost(HttpServletRequest request, @RequestParam("files[]") String[] files,
	        @RequestParam("filenames[]") String[] fileNames,
	        @RequestParam(value = "obs[]", required = false) String[] previousObs,
	        @RequestParam("patientid") Patient patient, @RequestParam("visitid") Visit visit,
	        @RequestParam("providerid") String providerId) throws JSONException {
		
		//		log.debug(getClass().getName() + " Request received with " + files.length + " files.");
		//		log.debug(getClass().getName() + " filename received : " + fileNames.length);
		//		log.debug(getClass().getName() + " visitid received : " + visit.getId());
		//		log.debug(getClass().getName() + " patientid received : " + patient.getId());
		//		log.debug(getClass().getName() + " providerid received : " + providerId);
		
		Provider provider = moduleContext.getProviderService().getProvider(Integer.valueOf(providerId));
		final Encounter encounter = moduleContext.getModuleEncounter(patient, visit, provider);
		
		try {
			for (int i = 0; i < files.length; i++) {
				File dataFile = getFile(fileNames[i], files[i].substring(files[i].indexOf(",") + 1));
				observationSaver.saveObservationFromFile(patient, encounter, dataFile);
				dataFile.delete();
			}
			
			if (previousObs != null && previousObs.length > 0) {
				// Iterate through obsIds and save it to current encounter
				for (String obsUuid : previousObs) {
					observationSaver.saveObservationFromUuid(patient, encounter, obsUuid);
				}
			}
			// Return success
			return new JSONObject().put("result", "success").toString();
		}
		catch (Exception e) {
			e.printStackTrace();
			return new JSONObject().put("result", "failed").toString();
		}
	}
	
	/**
	 * Convert base64 dataUrl to file
	 * 
	 * @param fileName - File name
	 * @param fileData - Base64 DataUrl
	 * @return - File
	 * @throws IOException
	 */
	private File getFile(String fileName, String fileData) throws IOException {
		String storedFileLocation = OpenmrsUtil.getApplicationDataDirectory() + "/docsanddrawing/temp";
		File folder = new File(storedFileLocation);
		folder.mkdirs();
		
		File serverFile = new File(folder, fileName);
		BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
		stream.write(Base64.decodeBase64(fileData.getBytes()));
		stream.close();
		return serverFile;
	}
	
}
