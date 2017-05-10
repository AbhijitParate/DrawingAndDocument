package org.openmrs.module.annotation;

import java.io.File;
import java.io.FilenameFilter;

public class ExtensionFilter implements FilenameFilter {
	
	/**
	 * @see java.io.FilenameFilter#accept(java.io.File, java.lang.String)
	 */
	@Override
	public boolean accept(File dir, String name) {
		return Utils.isImage(Utils.getFileExtension(name));
	}
	
}
