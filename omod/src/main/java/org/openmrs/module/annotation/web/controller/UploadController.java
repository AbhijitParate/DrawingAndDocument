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

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;
import org.openmrs.Encounter;
import org.openmrs.Patient;
import org.openmrs.Provider;
import org.openmrs.Visit;
import org.openmrs.module.annotation.Constants;
import org.openmrs.module.annotation.ModuleContext;
import org.openmrs.module.annotation.ObservationSaver;
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

@Controller("${rootrootArtifactId}.UploadController")
@RequestMapping(value = { "annotation/upload.form", "module/annotation/upload.form" })
public class UploadController {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	@Autowired
	@Qualifier(Constants.Component.MODULE_CONTEXT)
	protected ModuleContext moduleContext;
	
	@Autowired
	@Qualifier(Constants.Component.OBSERVATION_SAVER)
	protected ObservationSaver observationSaver;
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public void onGet(HttpServletResponse response) throws IOException {
		response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "Method not allowed.");
	}
	
	//	@RequestMapping(method = RequestMethod.POST)
	//	@ResponseBody
	//	public String onPostAttachment(HttpServletRequest request) throws Exception {
	//		JSONObject jsonObject = new JSONObject();
	//		if (request instanceof MultipartHttpServletRequest) {
	//
	//			try {
	//
	//				String file = request.getParameter("file");
	//				String filename = request.getParameter("filename");
	//				String filetype = request.getParameter("filetype");
	//				String patientId = request.getParameter("patientid");
	//				String visitId = request.getParameter("visitid");
	//
	//				if (filetype.equals(ATTACHMENT)) {
	//					saveFile(ATTACHMENT, file.substring(file.indexOf(",") + 1), filename, patientId, visitId);
	//					jsonObject.put("result", "success");
	//					return jsonObject.toString();
	//				} else if (filetype.equals(SVG)) {
	//					saveFile(SVG, file, filename, patientId, visitId);
	//					Drawing drawing = new Drawing();
	//					drawing.setVisitId(visitId);
	//					drawing.setPatientId(patientId);
	//					drawing.setSvgId(filename);
	//					jsonObject.put("result", "success");
	//					return jsonObject.toString();
	//				} else {
	//					jsonObject.put("result", "failed");
	//					return jsonObject.toString();
	//				}
	//			}
	//			catch (Exception e) {
	//				jsonObject.put("result", "failed");
	//				return jsonObject.toString();
	//			}
	//		} else {
	//			jsonObject.put("result", "not multipart post request");
	//			return jsonObject.toString();
	//		}
	//	}
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public String onPostAttachment2(HttpServletRequest request, @RequestParam("file") String fileData,
	        @RequestParam("filename") String fileName, @RequestParam("providerid") String fileType,
	        @RequestParam("patientid") Patient patient, @RequestParam("visitid") Visit visit,
	        @RequestParam("providerid") String providerId) throws Exception {
		
		log.debug(getClass().getName() + " Request received");
		log.error(getClass().getName() + " filename received : " + fileName);
		log.error(getClass().getName() + " visitid received : " + visit.getId());
		log.error(getClass().getName() + " patientid received : " + patient.getId());
		log.error(getClass().getName() + " providerid received : " + providerId);
		
		Provider provider = moduleContext.getProviderService().getProvider(Integer.valueOf(providerId));
		if (fileType.equals("attachment")) {
			fileData = fileData.substring(fileData.indexOf(",") + 1);
			fileData = fileData.trim();
		}
		File dataFile = getFile(fileName, fileData);
		final Encounter encounter = moduleContext.getModuleEncounter(patient, visit, provider);
		observationSaver.saveObservation(patient, encounter, dataFile);
		
		return new JSONObject().put("result", "success").toString();
	}
	
	private File getFile(String fileName, String fileData) throws IOException {
		String storedFileLocation = OpenmrsUtil.getApplicationDataDirectory() + "/Annotation/Temp";
		File folder = new File(storedFileLocation);
		folder.mkdirs();
		
		File serverFile = new File(folder, fileName);
		BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
		stream.write(Base64.decodeBase64(fileData.getBytes()));
		stream.close();
		return serverFile;
	}
	
	//    private String saveFile(String location, String fileData, String fileName, String patientId, String visitId)
	//	        throws Exception {
	//		String storedFileLocation = OpenmrsUtil.getApplicationDataDirectory() + "/Annotation/" + patientId + "/" + visitId
	//		        + "/" + location;
	//		File folder = new File(storedFileLocation);
	//		folder.mkdirs();
	//		// Create the file on server
	//		File serverFile = new File(folder, fileName);
	//		BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
	//		stream.write(Base64Utils.decode(fileData.getBytes()));
	//		stream.close();
	//		return storedFileLocation;
	//	}
	
}
