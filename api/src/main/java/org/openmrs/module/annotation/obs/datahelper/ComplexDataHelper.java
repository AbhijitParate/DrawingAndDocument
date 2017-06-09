package org.openmrs.module.annotation.obs.datahelper;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.module.annotation.Constants;
import org.openmrs.module.annotation.obs.data.ModuleComplexData;
import org.openmrs.obs.ComplexData;
import org.springframework.stereotype.Component;

/**
 * Created by abhij on 2/17/2017.
 */
// TODO: 3/9/2017 This can be replaced with builder
@Component(Constants.Component.COMPLEX_DATA_HELPER)
public class ComplexDataHelper {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	/**
	 * Builder for {@link ModuleComplexData} object from filename, {@link java.io.InputStream} of
	 * file and mimeType of file
	 * 
	 * @param fileName String - name of file to be saved
	 * @param data {@link java.io.InputStream} type casted as {@link Object}
	 * @param mimeType mimeType of the file
	 * @return ModuleComplexData object
	 */
	// TODO: 3/8/2017 MimeType can be removed from the signature and generate from file extension
	// 7
	public ModuleComplexData build(String fileName, Object data, String mimeType) {
		log.debug(getClass().getName() + ".build(1,2,3)");
		return new ModuleComplexData(fileName, data, mimeType);
	}
	
	/**
	 * Builder for {@link ModuleComplexData} object from {@link ComplexData}
	 * 
	 * @param complexData {@link ComplexData} object
	 * @return ModuleComplexData - validate and generate {@link ModuleComplexData} object from
	 *         complexData object
	 */
	public ModuleComplexData build(ComplexData complexData) {
		log.debug(getClass().getName() + ".build(1)");
		return new ModuleComplexData(complexData.getTitle(), complexData.getData(),
		        ((ModuleComplexData) complexData).getMimeType());
	}
	
	public String getContentType(ComplexData complexData) {
		return ((ModuleComplexData) complexData).getMimeType();
	}
}
