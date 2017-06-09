package org.openmrs.module.annotation;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.module.ModuleUtil;

import java.io.File;

/**
 * Created by abhij on 4/12/2017.
 */
public class TemplateUtils {
	
	private static Log log = LogFactory.getLog(TemplateUtils.class);

    /**
     * Healper method to get the template dir for the module in current setup
     * @return
     */
	public static File getDrawingDirectory() {
		
		//		File file = OpenmrsUtil.getDirectoryInApplicationDataDirectory(Constants.DRAWING_TEMPLATES_DIR);
		File file = ModuleUtil.getDevelopmentDirectory("annotation");
		
		if (!file.exists())
			file.mkdirs();
		return file;
	}
	
	public static File[] getAllTemplates() {
		File dir = getDrawingDirectory();
		return dir.listFiles(new ExtensionFilter());
	}
}
