package org.openmrs.module.annotation.obs.handler;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.Obs;
import org.openmrs.module.annotation.Constants;
import org.openmrs.module.annotation.obs.datahelper.ComplexDataHelper;
import org.openmrs.obs.ComplexData;
import org.openmrs.obs.ComplexObsHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 * Created by abhijit on 2/8/17.
 */
public abstract class AbstractComplexObsHandler implements ComplexObsHandler {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	private ComplexObsHandler parent;
	
	@Autowired
	@Qualifier(Constants.Component.COMPLEX_DATA_HELPER)
	protected ComplexDataHelper complexDataHelper;
	
	public AbstractComplexObsHandler() {
		super();
		setParentComplexObsHandler();
	}
	
	protected abstract void setParentComplexObsHandler();
}
