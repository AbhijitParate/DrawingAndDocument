/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.annotation.api.impl;

import org.openmrs.api.APIException;
import org.openmrs.api.impl.BaseOpenmrsService;
import org.openmrs.module.annotation.Drawing;
import org.openmrs.module.annotation.api.FileResourceService;

import java.io.File;
import java.io.IOException;

public class FileResourceServiceImpl extends BaseOpenmrsService implements FileResourceService {
	
	@Override
	public File getFile(Drawing drawing) throws APIException, IOException {
		return null;
	}
	
	@Override
	public boolean saveFile(Drawing drawing, File file) throws APIException, IOException {
		return false;
	}
	
	@Override
	public boolean removeFile(Drawing drawing, File file) throws APIException, IOException {
		return false;
	}
	
	@Override
	public boolean removeFolder(Drawing drawing) throws APIException, IOException {
		return false;
	}
}
