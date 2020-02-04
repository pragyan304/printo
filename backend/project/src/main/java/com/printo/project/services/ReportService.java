package com.printo.project.services;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import com.printo.project.entities.PrintDetails;
import net.sf.jasperreports.engine.JRException; 
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ReportService {	
	public String exportReport(Collection<PrintDetails> details ,PrintDetails pdata) throws FileNotFoundException, JRException {
		try {
			File file=ResourceUtils.getFile("./src/main/resources/printreport.jrxml");
			// compile the xml file
			JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
			// map the collection object
			JRBeanCollectionDataSource dataSource=new JRBeanCollectionDataSource(details);
			Map<String,Object> parameter=new HashMap<>();
			parameter.put("created by","PrintO");
			JasperPrint jasperPrint=JasperFillManager.fillReport(jasperReport, parameter,dataSource);
			String filename=pdata.getUsername()+"_"+pdata.getPrintername();
			JasperExportManager.exportReportToPdfFile(jasperPrint,"/home/pragyan/Downloads"+filename+".pdf");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
