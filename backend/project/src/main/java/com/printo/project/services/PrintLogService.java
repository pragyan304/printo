package com.printo.project.services;

import java.io.FileNotFoundException;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.printo.project.database.PrintLogDB;
import com.printo.project.entities.PrintDetails;
import net.sf.jasperreports.engine.JRException;

@Service
public class PrintLogService {
	
	@Autowired
	private ReportService reportService;
	@Autowired
	private PrintLogDB printLogDB;
	
		// get all records
		public List<PrintDetails> getAll() {
		List<PrintDetails> printDetails=(List<PrintDetails>) printLogDB.findAll();
		return printDetails;
		}
		// get all record on paremeter
		public Collection<PrintDetails> getSeperated(PrintDetails ww) {
		Collection<PrintDetails> ll=null;
		
		if(ww.getUsername().equals("all")&&ww.getPrintername().equals("all")&&ww.getDate()!=null&&ww.getDate1()!=null) {
			ll=printLogDB.allRecordWithSpecifyDate(ww.getDate(),ww.getDate1());
		}
		else if(!ww.getUsername().equals("all")&&ww.getPrintername().equals("all")&&ww.getDate()!=null&&ww.getDate1()!=null) {
			ll=printLogDB.specifycUserRecordWithSpecifyDate(ww.getUsername(),ww.getDate(),ww.getDate1());
		}
		else if(ww.getUsername().equals("all")&&!ww.getPrintername().equals("all")&&ww.getDate()!=null&&ww.getDate1()!=null) {
			ll=printLogDB.specifycPrinterRecordWithSpecifyDate(ww.getDate(),ww.getDate1());
		}
		else if(!ww.getUsername().equals("all")&&!ww.getPrintername().equals("all")&&ww.getDate()!=null&&ww.getDate1()!=null) {
			ll=printLogDB.specifycPrinterRecordWithSpecifyDate(ww.getUsername(),ww.getPrintername(),ww.getDate(),ww.getDate1());
		}
		else if(ww.getUsername().equals("all")&&ww.getPrintername().equals("all")) {  //one
				ll=(Collection<PrintDetails>) printLogDB.findAll();
		}
		else if(!ww.getUsername().equals("all")&&ww.getPrintername().equals("all")) {  //two
				ll=printLogDB.two(ww.getUsername());
		}
		else if(ww.getUsername().equals("all")&&!ww.getPrintername().equals("all")) {	//three
				ll=printLogDB.three(ww.getPrintername());
		}
		else if(!ww.getUsername().equals("all")&&!ww.getPrintername().equals("all")) {	//four
				ll=printLogDB.four(ww.getUsername(),ww.getPrintername());
		}
		else {
			ll=null;
		}
		return ll;
	}
	
	//download report
	public void downloadReport(PrintDetails pdata) {
		Collection<PrintDetails> cdata=getSeperated(pdata);
		try {
			reportService.exportReport(cdata,pdata);
		} catch (FileNotFoundException | JRException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//  get unique data on client request
	public Collection<PrintDetails> getUniqueData(String id) {
		Collection<PrintDetails> data=printLogDB.two(id);
		return data;
	}
	
	// get today data on client request
	public Collection<PrintDetails> getClientTodayDataService(String id) { 
		   java.sql.Date sqlDate = new java.sql.Date(new Date().getTime());
		   PrintDetails details=new PrintDetails();
		   details.setDate(sqlDate);
		   details.setUsername(id);
		   Collection<PrintDetails> data=printLogDB.getClientTodayDataDB(details.getUsername(),details.getDate());
		   return data;
	}
	// get Client Date Range Data Service
	public Collection<PrintDetails> getClientDateRangeDataService(PrintDetails details) {
		Collection<PrintDetails> data=printLogDB.specifycUserRecordWithSpecifyDate(details.getUsername(),details.getDate(),details.getDate1());
		   return data;
	}
}
