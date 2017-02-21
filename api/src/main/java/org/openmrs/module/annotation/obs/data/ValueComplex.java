package org.openmrs.module.annotation.obs.data;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.openmrs.module.annotation.Constants;
import org.openmrs.module.annotation.ModuleContext;

import java.util.Arrays;
import java.util.regex.Pattern;

public class ValueComplex {
	
	private static final String INSTRUCTION = "Instruction";
	
	public static final String INSTRUCTION_NONE = INSTRUCTION + ".none";
	
	public static final String INSTRUCTION_DEFAULT = INSTRUCTION + ".default";
	
	protected static final String FILENAME_DEFAULT = Constants.MODULE_ID + "_file";
	
	protected String instructions = INSTRUCTION_NONE;
	
	protected String mimeType = Constants.UNKNOWN_MIME_TYPE;
	
	protected String fileName = Constants.MODULE_ID + "_file.dat";
	
	protected final static String UNIQUE_PREFIX = "d_and_a"; // This is used to identify our implementation from saved valueComplex.
	
	protected final static String SEP = " | ";
	
	protected final static int METADATA_PARTS_COUNT = StringUtils.countMatches(buildValueComplex("", "", ""), SEP);
	
	public ValueComplex(String valueComplex) {
		
		if (!StringUtils.substringBefore(valueComplex, SEP).equals(UNIQUE_PREFIX)) {
			this.instructions = INSTRUCTION_NONE;
			return;
		}
		
		String metaData = StringUtils.substringAfter(valueComplex, SEP);
		String[] metaParts = metaData.split(Pattern.quote(SEP));
		
		if (metaParts.length > 0) {
			instructions = metaParts[0];
			if (!isValidInstructions(instructions)) {
				instructions = INSTRUCTION_NONE;
			}
		}
		if (metaParts.length > 1) {
			mimeType = metaParts[1];
			if (!isValidMimeType(mimeType)) {
				mimeType = Constants.UNKNOWN_MIME_TYPE;
			}
		}
		if (metaParts.length > 2) {
			String[] fileNameParts = Arrays.copyOfRange(metaParts, 2, metaParts.length);
			fileName = StringUtils.join(fileNameParts, SEP);
		} else {
			int sepCount = StringUtils.countMatches(valueComplex, SEP);
			if (sepCount >= METADATA_PARTS_COUNT) {
				int pos = StringUtils.ordinalIndexOf(valueComplex, SEP, METADATA_PARTS_COUNT);
				pos += SEP.length();
				fileName = StringUtils.substring(valueComplex, pos);
			} else { // That'd be a case where the file name is not even part of the valueComplex String, anything else looking valid.
				fileName = FilenameUtils.removeExtension(fileName) + "." + ModuleContext.getExtension(mimeType);
			}
		}
	}
	
	public ValueComplex(String instructions, String mimeType, String fileName) {
		this(buildValueComplex(instructions, mimeType, fileName));
	}
	
	@Override
	public String toString() {
		return buildValueComplex(instructions, mimeType, fileName);
	}
	
	public boolean isOwnImplementation() {
		return !instructions.equals(INSTRUCTION_NONE);
	}
	
	public String getInstructions() {
		return instructions;
	}
	
	public String getFileName() {
		return fileName;
	}
	
	public String getMimeType() {
		return mimeType;
	}
	
	public String getValueComplex() {
		return buildValueComplex(instructions, mimeType, fileName);
	}
	
	public static String buildValueComplex(String instructions, String mimeType, String savedFileName) {
		return UNIQUE_PREFIX + SEP + instructions + SEP + mimeType + SEP + savedFileName;
	}
	
	protected static boolean isValidInstructions(String str) {
		return StringUtils.startsWith(str, INSTRUCTION + ".");
	}
	
	protected static boolean isValidMimeType(String str) {
		return Constants.mimeTypes.containsKey(str);
	}
}
