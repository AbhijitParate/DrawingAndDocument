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

import org.openmrs.api.UserService;
import org.openmrs.util.OpenmrsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * This class configured as controller using annotation and mapped with the URL of
 * 'module/annotation/annotationLink.form'.
 */
@Controller("${rootrootArtifactId}.DownloadController")
@RequestMapping(value = "module/annotation/download.form")
public class DownloadController {
	
	@Autowired
	private UserService userService;
	
	@SuppressWarnings("Duplicates")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public void onGet(@RequestParam(value = "filename") String filename, HttpServletResponse response) throws IOException {
		File file = new File(OpenmrsUtil.getApplicationDataDirectory() + "/Annotation/" + filename);
		if (file.exists()) {
			InputStream in = new FileInputStream(file);
			response.setHeader("Content-Disposition", "inline; filename=" + file.getName());
			response.setHeader("Content-Length", String.valueOf(file.length()));
			FileCopyUtils.copy(in, response.getOutputStream());
		} else {
			response.sendError(HttpServletResponse.SC_NOT_FOUND, "File not found.");
		}
		//		response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "Method not allowed.");
	}
	
	@SuppressWarnings("Duplicates")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public void onPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if (request instanceof MultipartHttpServletRequest) {
			MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
			String filename = multipartHttpServletRequest.getParameter("filename");
			File file = new File(OpenmrsUtil.getApplicationDataDirectory() + "/Annotation/" + filename);
			if (file.exists()) {
				InputStream in = new FileInputStream(file);
				response.setHeader("Content-Disposition", "inline; filename=" + file.getName());
				response.setHeader("Content-Length", String.valueOf(file.length()));
				FileCopyUtils.copy(in, response.getOutputStream());
			} else {
				response.sendError(HttpServletResponse.SC_NOT_FOUND, "File not found.");
			}
		} else {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Bad request.");
		}
	}
	
}
