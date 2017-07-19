package org.openmrs.module.docsanddrawing.fragment.controller;

import org.openmrs.ui.framework.annotation.FragmentParam;
import org.openmrs.ui.framework.fragment.FragmentModel;

/**
 * Controller for status bar fragment
 */
public class StatusBarFragmentController {
	
	//	Log log = LogFactory.getLog(getClass());
	
	// TODO: 3/9/2017 Customize for view only
	public void controller(FragmentModel model, @FragmentParam(value = "mode", required = false) String mode)
	        throws Exception {
		//		log.debug(getClass().getSimpleName() + ".controller()");
		model.addAttribute("mode", mode);
	}
}
