/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.annotation.api;

import org.openmrs.api.APIException;
import org.openmrs.module.annotation.Drawing;

import java.io.File;
import java.io.IOException;

/**
 * The main service of this module, which is exposed for other modules. See
 * moduleApplicationContext.xml on how it is wired up.
 */
public interface FileResourceService {
	
	File getFile(Drawing drawing) throws APIException, IOException;
	
	boolean saveFile(Drawing drawing, File file) throws APIException, IOException;
	
	boolean removeFile(Drawing drawing, File file) throws APIException, IOException;
	
	boolean removeFolder(Drawing drawing) throws APIException, IOException;
}
