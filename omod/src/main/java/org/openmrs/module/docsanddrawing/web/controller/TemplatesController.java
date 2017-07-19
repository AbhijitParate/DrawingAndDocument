package org.openmrs.module.docsanddrawing.web.controller;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.openmrs.module.web.WebModuleUtil;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.v1_0.controller.MainResourceController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Manage template controller
 */
@Controller
@RequestMapping(value = "/rest/" + RestConstants.VERSION_1 + "/docsanddrawing/template")
public class TemplatesController extends MainResourceController {
	
	private final Log log = LogFactory.getLog(getClass());
	
	/**
	 * Get list of available templates
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@ResponseBody
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public String onGetAll(HttpServletRequest request, HttpServletResponse response) throws IOException {
		File file = getTemplateDir();
		JSONArray jsonArray = new JSONArray();
		if (file.exists() && file.isDirectory() && file.listFiles() != null) {
			for (File f : file.listFiles()) {
				jsonArray.put(f.getName());
			}
		}
		return jsonArray.toString();
	}
	
	/**
	 * Get template
	 * 
	 * @param fileName
	 * @param response
	 * @throws IOException
	 */
	@ResponseBody
	@RequestMapping(value = "/get/{fileName:.+}", method = RequestMethod.GET)
	public void onGetTemplate(@PathVariable(value = "fileName") String fileName, HttpServletResponse response)
	        throws IOException {
		File file = new File(getTemplateDir(), fileName);
		
		if (file.exists()) {
			InputStream is = new FileInputStream(file);
			IOUtils.copy(is, response.getOutputStream());
			response.flushBuffer();
		} else
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
		
	}
	
	/**
	 * Delete template
	 * 
	 * @param fileName
	 * @param response
	 * @return
	 * @throws IOException
	 * @throws JSONException
	 */
	@ResponseBody
	@RequestMapping(value = "/delete/{fileName:.+}", method = RequestMethod.GET)
	public String onDeleteTemplate(@PathVariable(value = "fileName") String fileName, HttpServletResponse response)
	        throws IOException, JSONException {
		File file = new File(getTemplateDir(), fileName);
		
		if (file.exists() && file.delete()) {
			return new JSONObject().put("result", "success").toString();
		} else
			return new JSONObject().put("result", "failed").toString();
		
	}
	
	/**
	 * Upload new template
	 * 
	 * @param request
	 * @param fileName
	 * @param file
	 * @param response
	 * @return
	 * @throws IOException
	 * @throws JSONException
	 */
	@ResponseBody
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String onUploadTemplate(HttpServletRequest request, @RequestParam(value = "filename") String fileName,
	        @RequestParam(value = "file") String file, HttpServletResponse response) throws IOException, JSONException {
		log.debug(getClass().getName() + " filename received : " + fileName);
		
		if (!file.isEmpty()) {
			try {
				File templateDir = getTemplateDir();
				File templateFile = new File(templateDir, fileName);
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(templateFile));
				stream.write(Base64.decodeBase64(file.getBytes()));
				stream.close();
				return new JSONObject().put("result", "success").toString();
			}
			catch (Exception e) {
				return new JSONObject().put("result", "failed").put("description", "Exception occurred").toString();
			}
		} else {
			return new JSONObject().put("result", "failed").put("description", "File is empty").toString();
		}
	}
	
	/**
	 * Returns template directory
	 * 
	 * @return
	 */
	@Override
	public String getNamespace() {
		return "v1/docsanddrawing/template";
	}
	
	private File getTemplateDir() {
		String rootFolderPath = WebModuleUtil.getModuleWebFolder("docsanddrawing");
		return new File(rootFolderPath, "templates");
	}
	
}
