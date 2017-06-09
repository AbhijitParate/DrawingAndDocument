package org.openmrs.module.annotation.obs.data;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.module.annotation.Constants;
import org.openmrs.obs.ComplexData;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.RenderedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import static org.openmrs.module.annotation.Utils.getObsTypeFromMimeType;

/**
 * ModuleComplexData extends from {@link ComplexData} and two additional properties mimeType and
 * obsType
 */
public class ModuleComplexData extends ComplexData {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	private static final long serialVersionUID = 1L;
	
	private String obsType = Constants.MODULE_ID;
	
	private String mimeType = Constants.UNKNOWN_MIME_TYPE;
	
	/**
	 * Constructor
	 * 
	 * @param fileName String - name of file to be saved
	 * @param data Object - this is {@link InputStream} in this case
	 * @param mimeType String - mimeTye of the file
	 */
	// TODO: 3/8/2017 Remove mimeType parameter form the signature can be constructed from the file extension
	// 8
	public ModuleComplexData(String fileName, Object data, String mimeType) {
		super(fileName, data);
		log.debug(getClass().getName() + ".ModuleComplexData()");
		if (!StringUtils.isEmpty(mimeType)) {
			this.mimeType = mimeType;
		}
		this.obsType = getObsTypeFromMimeType(mimeType);
	}
	
	// 10
	public ComplexData asComplexData() {
		log.debug(getClass().getName() + ".asComplexData()");
		return this;
	}
	
	// 12 -> 14
	public String getObsType() {
		log.debug(getClass().getName() + ".getObsType()");
		return obsType;
	}
	
	public void setObsType(String obsType) {
		log.debug(getClass().getName() + ".setObsType()");
		this.obsType = obsType;
	}
	
	public byte[] asByteArray() {
		log.debug(getClass().getName() + ".asByteArray()");
		return getByteArray(this);
	}
	
	/**
	 * Generates byte array from complex data
	 * 
	 * @param complexData ComplexData object
	 * @return byte[] of the actual complex data
	 */
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
	
	/**
	 * Returns input stream of complex data
	 * 
	 * @return InputStream of complex data
	 */
	public InputStream asInputStream() {
		log.debug(getClass().getName() + ".asInputStream()");
		return (InputStream) this.getData();
	}
	
	// 9
	public void setMimeType(String mimeType) {
		log.debug(getClass().getName() + ".setMimeType()");
		this.mimeType = mimeType;
	}
	
	// 16
	public String getMimeType() {
		log.debug(getClass().getName() + ".getMimeType()");
		return this.mimeType;
	}
}
