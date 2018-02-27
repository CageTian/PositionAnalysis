package edu.dlut.software.wangz;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import jeasy.analysis.MMAnalyzer;

public class Job_JE {
	private static Map<String, Integer> allCounts = new HashMap<String, Integer>();

	private static Connection conn;

	private static Set<String> allNoWords = new HashSet<String>();

	static {
		try {
			
			Class.forName("org.gjt.mm.mysql.Driver");
			conn = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/lg_job_data?useUnicode=true&characterEncoding=UTF-8", "root",
					"123abc");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) throws Exception {
		// // �ִ���ʹ�÷���
		 MMAnalyzer mm = new MMAnalyzer();
		// // System.out.println(mm.segment(
		// //
		// "���ߣ���ᰵ�ǰ�ҹ�����ҽԺ�������Խ��ڵ���ʵ�����ҹ�ҽ��������ҵһֱ�������������ʽ�������⣬�ر��ǹ���ҽԺ�ʽ��ģ���㡢����������һ�����ʼ�Ч���ѵ�ì�ܣ��Թ���ҽԺ�ĸ�������ص���Լ��Ϊ����Ч��������ì��ѹ������Ч���Ʊ����ҹ�����ҽԺ��",
		// // "|"));
		//
		// // �����е��ı����ݶ�ȡ��Ȼ��ִ�ͳ�ƴ�Ƶ����
		// String dirPath = "/Users/kkb/Documents/dg_sina_news_data";
		// File dir = new File(dirPath);
		// File[] allFiles = dir.listFiles();
		// for (File f : allFiles) {
		// BufferedReader reader = new BufferedReader(new FileReader(f));
		// String line = null;
		// int tempCount = 1;
		// while ((line = reader.readLine()) != null) {
		//
		// if (tempCount != 3) {
		// String[] words = mm.segment(line, "|").split("\\|");
			
			String type = null;
			String line = null;
			String[] words = null;
			ResultSet rs = null;
			PreparedStatement pst = null;
			String sql = "SELECT  id_type, detail  FROM job_info  NATURAL JOIN job_detail WHERE detail IS NOT NULL";
//		String sql = "SELECT id_type, temptation FROM job_info WHERE temptation IS NOT NULL";
			pst = conn.prepareStatement(sql,ResultSet.TYPE_FORWARD_ONLY,   ResultSet.CONCUR_READ_ONLY);
			pst.setFetchSize(Integer.MIN_VALUE);
			pst.setFetchDirection(ResultSet.FETCH_REVERSE);  
			rs = pst.executeQuery();
			int count = 0;
			while(rs.next()){
				type = rs.getString(1);
				line = rs.getString(2);
//			words = line.split("/");
//			words = line.split("#");
				words = mm.segment(line, "|").split("\\|");
				
				for(String word:words){
					if (word != null && !word.trim().equals("")){
						if(allCounts.containsKey(word+"--"+type)){
							allCounts.put(word+"--"+type, allCounts.get(word+"--"+type)+1);
						}else{
							allCounts.put(word+"--"+type, 1);
						}
					}	
				}
				count++;
				if(count%1000 == 0){
						System.out.println("�Ѿ�������"+count+"������");
				}
			}
		 // ͨ��JDBC�������д�Ƶ���ݱ��浽���ݿ���
		 sql = "INSERT INTO word_count3 VALUES (?,?,?)";
		 Set<String> keySet = allCounts.keySet();
		
		 for (String key : keySet) {
			 int value = allCounts.get(key);
			 try {
				 pst = conn.prepareStatement(sql);
				 pst.setString(1, key.split("--")[0]);
				 pst.setString(2, key.split("--")[1]);
				 pst.setInt(3, value);
				 pst.executeUpdate();
				 pst.close();
			 } catch (Exception e) {
				 e.printStackTrace();
			 }
		 }
		
		 conn.close();
	}

//	public static void getMySQLData() throws Exception {
//		String sql = "SELECT keywords,counts FROM sina_data ORDER BY counts DESC LIMIT 0,20";
//		PreparedStatement pst = conn.prepareStatement(sql);
//		ResultSet rs = pst.executeQuery();
//		StringBuilder sb1 = new StringBuilder();
//		StringBuilder sb2 = new StringBuilder();
//		StringBuilder sb3 = new StringBuilder();
//		while(rs.next()) {
//			sb1.append("\"");
//			sb1.append(rs.getString(1));
//			sb1.append("\",");
//			
//			sb2.append(rs.getInt(2));
//			sb2.append(",");
//			
//			sb3.append("{");
//			sb3.append("name:\"");
//			sb3.append(rs.getString(1));
//			sb3.append("\",value:");
//			sb3.append(rs.getInt(2));
//			sb3.append("},");
//		}
//		
//		rs.close();
//		pst.close();
//		conn.close();
//		System.out.println(sb1);
//		System.out.println(sb2);
//		System.out.println(sb3);
//	}
}
