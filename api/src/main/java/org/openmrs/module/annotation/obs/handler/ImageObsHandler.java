package org.openmrs.module.annotation.obs.handler;

import org.openmrs.Obs;
import org.openmrs.api.APIException;

/**
 * Created by abhijit on 2/16/17.
 */
public class ImageObsHandler extends AbstractComplexObsHandler {
	
	@Override
	protected void setParentComplexObsHandler() {
		
	}
	
	@Override
	public Obs saveObs(Obs obs) throws APIException {
		return null;
	}
	
	@Override
	public Obs getObs(Obs obs, String s) {
		return null;
	}
	
	@Override
	public boolean purgeComplexData(Obs obs) {
		return false;
	}
	
	@Override
	public String[] getSupportedViews() {
		return new String[0];
	}
	
	@Override
	public boolean supportsView(String s) {
		return false;
	}
}
