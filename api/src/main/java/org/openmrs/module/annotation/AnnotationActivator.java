/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.annotation;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.api.context.Context;
import org.openmrs.module.BaseModuleActivator;
import org.openmrs.module.ModuleFactory;
import org.openmrs.module.htmlformentry.HtmlFormEntryService;

/**
 * This class contains the logic that is run every time this module is either started or shutdown
 */
public class AnnotationActivator extends BaseModuleActivator {
	
	private Log log = LogFactory.getLog(this.getClass());
	
	@Override
	public void contextRefreshed() {
		log.info("contextRefreshed");
	}
	
	@Override
	public void started() {
		if (ModuleFactory.isModuleStarted("htmlformentry")) {
			HtmlFormEntryService htmlFormEntryService = Context.getService(HtmlFormEntryService.class);
			htmlFormEntryService.addHandler(Constants.MODULE_TAG, new DrawingTagHandler());
		}
		log.info("started");
	}
	
	@Override
	public void stopped() {
		try {
			HtmlFormEntryService htmlFormEntryService = Context.getService(HtmlFormEntryService.class);
			htmlFormEntryService.getHandlers().remove(Constants.MODULE_TAG);
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		log.info("stopped");
	}
	
	@Override
	public void willRefreshContext() {
		log.info("willRefreshContext");
	}
	
	@Override
	public void willStart() {
		log.info("willStart");
	}
	
	@Override
	public void willStop() {
		log.info("willStop");
	}
}
