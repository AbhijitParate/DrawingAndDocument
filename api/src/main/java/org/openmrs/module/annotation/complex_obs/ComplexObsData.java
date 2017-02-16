package org.openmrs.module.annotation.complex_obs;

import org.openmrs.obs.ComplexData;

/**
 * Created by abhijit on 2/8/17.
 */
public interface ComplexObsData {
	
	public ComplexData asComplexData();
	
	public byte[] asByteArray();
	
	public String getTitle();
	
	public Object getData();
	
	public String getType();
	
}
