package org.openmrs.module.annotation.obs.data;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.openmrs.module.annotation.Constants;
import org.openmrs.obs.ComplexData;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.RenderedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by abhij on 2/17/2017.
 */
public class ModuleComplexData extends ComplexData {
	
	private static final long serialVersionUID = 1L;
	
	private String instruction = ValueComplex.INSTRUCTION_NONE;
	
	private String mimeType;
	
	public ModuleComplexData(String title, Object data, String mimeType, String instruction) {
		super(title, data);
		if (!StringUtils.isEmpty(mimeType)) {
			this.setMimeType(mimeType);
		} else {
			this.setMimeType(Constants.UNKNOWN_MIME_TYPE);
		}
		if (!StringUtils.isEmpty(instruction))
			this.instruction = instruction;
	}
	
	public ComplexData asComplexData() {
		return this;
	}
	
	public String getInstruction() {
		return instruction;
	}
	
	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}
	
	public byte[] asByteArray() {
		return getByteArray(this);
	}
	
	public static byte[] getByteArray(ComplexData complexData) {
		final byte[] emptyContent = new byte[0];
		
		Object data = (complexData != null) ? complexData.getData() : emptyContent;
		
		if (data == null) {
			return emptyContent;
		}
		if (data instanceof byte[]) {
			return (byte[]) data;
		} else if (RenderedImage.class.isAssignableFrom(data.getClass())) {
			RenderedImage image = (RenderedImage) data;
			
			ByteArrayOutputStream bytesOutStream = new ByteArrayOutputStream();
			try {
				ImageOutputStream imgOutStream = ImageIO.createImageOutputStream(bytesOutStream);
				String extension = FilenameUtils.getExtension(complexData.getTitle());
				ImageIO.write(image, extension, imgOutStream);
				imgOutStream.close();
			}
			catch (IOException e) {
				return emptyContent;
			}
			
			return bytesOutStream.toByteArray();
		} else if (InputStream.class.isAssignableFrom(data.getClass())) {
			try {
				return IOUtils.toByteArray((InputStream) data);
			}
			catch (IOException e) {
				return emptyContent;
			}
		} else {
			return emptyContent;
		}
	}
	
	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}
	
	public String getMimeType() {
		return mimeType;
	}
}
