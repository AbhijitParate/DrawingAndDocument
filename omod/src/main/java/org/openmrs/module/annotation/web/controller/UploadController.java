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

import org.json.JSONObject;
import org.openmrs.api.UserService;
import org.openmrs.module.annotation.Drawing;
import org.openmrs.module.annotation.api.AnnotationService;
import org.openmrs.util.OpenmrsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Controller("${rootrootArtifactId}.UploadController")
@RequestMapping(value = { "annotation/upload.form", "module/annotation/upload.form" })
public class UploadController {
	
	public static final String ATTACHMENT = "attachment";
	
	public static final String SVG = "svg";
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AnnotationService annotationService;
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public void onGet(HttpServletResponse response) throws IOException {
		response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "Method not allowed.");
	}
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public String onPostAttachment(HttpServletRequest request) throws Exception {
		JSONObject jsonObject = new JSONObject();
		if (request instanceof MultipartHttpServletRequest) {
			
			try {
				
				String file = request.getParameter("file");
				String filename = request.getParameter("filename");
				String filetype = request.getParameter("filetype");
				String patientId = request.getParameter("patientid");
				String visitId = request.getParameter("visitid");
				
				if (filetype.equals(ATTACHMENT)) {
					saveFile(ATTACHMENT, file.substring(file.indexOf(",") + 1), filename, patientId, visitId);
					jsonObject.put("result", "success");
					return jsonObject.toString();
				} else if (filetype.equals(SVG)) {
					saveFile(SVG, file, filename, patientId, visitId);
					Drawing drawing = new Drawing();
					drawing.setVisitId(visitId);
					drawing.setPatientId(patientId);
					drawing.setSvgId(filename);
					annotationService.addOrUpdateDrawing(drawing);
					jsonObject.put("result", "success");
					return jsonObject.toString();
				} else {
					jsonObject.put("result", "failed");
					return jsonObject.toString();
				}
			}
			catch (Exception e) {
				jsonObject.put("result", "failed");
				return jsonObject.toString();
			}
		} else {
			jsonObject.put("result", "not multipart post request");
			return jsonObject.toString();
		}
	}
	
	//	@RequestMapping(value = { "annotation/upload_svg.form", "module/annotation/upload_svg.form" }, method = RequestMethod.POST)
	//	@ResponseBody
	//	public String onPostSVG(HttpServletRequest request) throws Exception {
	//		JSONObject jsonObject = new JSONObject();
	//		if (request instanceof MultipartHttpServletRequest) {
	//			//			CommonsMultipartFile multipartFile = null;
	//			//			MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
	//			//			Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
	//			//
	//			//			while (iterator.hasNext()) {
	//			//				String key = iterator.next();
	//			//				// create multipartFile array if you upload multiple files
	//			//				multipartFile = (CommonsMultipartFile) multipartHttpServletRequest.getFile(key);
	//			//				String filename = multipartFile.getOriginalFilename();
	//			//				saveFile(multipartFile.getBytes(), filename);
	//			//			}
	//
	//			String file = request.getParameter("file");
	//			String filename = request.getParameter("filename");
	//			String filetype = request.getParameter("filetype");
	//			String fileid = request.getParameter("fileid");
	//			String patientId = request.getParameter("patientid");
	//			String visitId = request.getParameter("visitid");
	//
	//			saveFile(ATTACHMENT, file.substring(file.indexOf(",") + 1), filename, patientId, visitId);
	//
	//			Drawing drawing = new Drawing();
	//			drawing.setVisitId(visitId);
	//			drawing.setPatientId(patientId);
	////			annotationService.addOrUpdateDrawing(drawing);
	//
	//			jsonObject.put("result", "success");
	//			return jsonObject.toString();
	//		} else {
	//			jsonObject.put("result", "not multipart post request");
	//			return jsonObject.toString();
	//		}
	//	}
	
	private String saveFile(String location, String fileData, String fileName, String patientId, String visitId)
	        throws Exception {
		String storedFileLocation = OpenmrsUtil.getApplicationDataDirectory() + "/Annotation/" + patientId + "/" + visitId
		        + "/" + location;
		File folder = new File(storedFileLocation);
		folder.mkdirs();
		// Create the file on server
		File serverFile = new File(folder, fileName);
		BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
		stream.write(Base64Utils.decode(fileData.getBytes()));
		stream.close();
		return storedFileLocation;
	}
	
}
