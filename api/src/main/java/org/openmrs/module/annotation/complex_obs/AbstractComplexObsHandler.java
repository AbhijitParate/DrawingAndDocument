package org.openmrs.module.annotation.complex_obs;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.obs.ComplexObsHandler;

/**
 * Created by abhijit on 2/8/17.
 */
public abstract class AbstractComplexObsHandler implements ComplexObsHandler {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	private ComplexObsHandler parent;
	
}
