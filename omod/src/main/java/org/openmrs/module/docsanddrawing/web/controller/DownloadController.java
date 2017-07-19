package org.openmrs.module.docsanddrawing.web.controller;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.Obs;
import org.openmrs.module.docsanddrawing.Constants;
import org.openmrs.module.docsanddrawing.ModuleContext;
import org.openmrs.module.docsanddrawing.obs.data.ModuleComplexData;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.v1_0.controller.MainResourceController;
import org.openmrs.obs.ComplexData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

import static org.openmrs.module.docsanddrawing.Utils.getContentType;
import static org.openmrs.module.docsanddrawing.Utils.getExtension;

/**
 * Get drawing / attachment controller
 */
@Controller
@RequestMapping(value = "/rest/" + RestConstants.VERSION_1 + "/docsanddrawing")
public class DownloadController extends MainResourceController {
	
	private final Log log = LogFactory.getLog(getClass());
	
	@Autowired
	@Qualifier(Constants.Component.MODULE_CONTEXT)
	private ModuleContext moduleContext;
	
	/**
	 * Get observation with uuid and filename
	 * 
	 * @param obsUuid
	 * @param fileName
	 * @param view
	 * @param response
	 * @throws IOException
	 */
	@ResponseBody
	@RequestMapping(value = "/obs/{obsUuid}/{fileName:.+}")
	public void onGet(@PathVariable(value = "obsUuid") String obsUuid, @PathVariable(value = "fileName") String fileName,
	        @RequestParam(value = "view", required = false) String view, HttpServletResponse response) throws IOException {
		
		//		log.debug("Obs ID" + obsUuid);
		//		log.debug("FileName " + fileName);
		
		// Getting the Core/Platform complex data object
		Obs obs = moduleContext.getObsService().getObsByUuid(obsUuid);
		Obs complexObs = moduleContext.getObsService().getComplexObs(obs.getObsId(), view);
		ComplexData complexData = complexObs.getComplexData();
		
		// Switching to our complex data object
		// ValueComplex valueComplex = new ValueComplex(obs.getValueComplex());
		ModuleComplexData moduleComplexData = moduleContext.getComplexDataHelper().build(complexData);
		
		String mimeType = moduleComplexData.getMimeType();
		if (moduleComplexData.getTitle().contains("svg"))
			mimeType = Constants.contentTypes.get(".svg");
		try {
			// The document meta data is sent as HTTP headers.
			response.setContentType(mimeType);
			response.addHeader("Content-Family", getContentType(mimeType).name()); // custom header
			response.addHeader("File-Name", moduleComplexData.getTitle()); // custom header
			response.addHeader("File-Ext", getExtension(moduleComplexData.getTitle(), mimeType)); // custom header
			response.addHeader("ObsId", obsUuid); // custom header
			response.addHeader("FileName", fileName); // custom header
			InputStream is = moduleComplexData.asInputStream();
			IOUtils.copy(is, response.getOutputStream());
			response.flushBuffer();
		}
		catch (IOException e) {
			response.setStatus(500);
			log.debug(
			    "Could not write to HTTP response for when fetching obs with" + " VALUE_COMPLEX='"
			            + complexObs.getValueComplex() + "'," + " OBS_ID='" + complexObs.getId() + "'," + " OBS_UUID='"
			            + complexObs.getUuid() + "'", e);
		}
	}
	
	@Override
	public String getNamespace() {
		return "v1/docsanddrawing";
	}
	
}
