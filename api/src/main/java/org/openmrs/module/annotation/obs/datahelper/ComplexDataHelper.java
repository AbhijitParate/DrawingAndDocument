package org.openmrs.module.annotation.obs.datahelper;

import org.openmrs.module.annotation.Constants;
import org.openmrs.module.annotation.obs.data.ModuleComplexData;
import org.openmrs.obs.ComplexData;
import org.springframework.stereotype.Component;

/**
 * Created by abhij on 2/17/2017.
 */
@Component(Constants.Component.COMPLEX_DATA_HELPER)
public class ComplexDataHelper {
	
	public ModuleComplexData build(String title, Object data, String mimeType) {
		return new ModuleComplexData(title, data, mimeType);
	}
	
	public ModuleComplexData build(ComplexData complexData) {
		return new ModuleComplexData(complexData.getTitle(), complexData.getData(), complexData.getMimeType());
	}
	
	public String getContentType(ComplexData complexData) {
		return complexData.getMimeType();
	}
}
