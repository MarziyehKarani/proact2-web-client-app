const ExcelJS = require("exceljs");

const generateAndDownloadExcelFile = (data) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");

    let surveyName=data?.surveyTitle;

    sheet.getCell('A1').value = 'Survey Title:';
    sheet.getCell('B1').value = data?.surveyTitle;

    sheet.getCell('A2').value = 'Survey Description:';
    sheet.getCell('B2').value = data?.surveyDescription;

    sheet.getCell('A3').value = 'Survey Version:';
    sheet.getCell('B3').value = data?.surveyVersion;

    sheet.getCell('A1').font = { bold: true};
    sheet.getCell('A2').font = { bold: true};
    sheet.getCell('A3').font = { bold: true};
    sheet.getCell('B1').font = { bold: true};
    sheet.getCell('B2').font = { bold: true};
    sheet.getCell('B3').font = { bold: true};

// add a table to a sheet
sheet.addTable({
  name: 'MyTable',
  ref: 'A5',
  headerRow: true,
  totalsRow: false,
  style: {
    showRowStripes: true,
  },
  columns: [
    {
      name : "PatientName"
    },
    {
      name: "StartDate"
    },
    {
      name: "CompleteDate"
    },
    {
      name: "Completed"
    }
  ],
  rows: [
  ],
});


const table = sheet.getTable('MyTable');

//add questions to header
data.assignedPatients[0]?.questionWithAnswers?.forEach(header =>{

  table.addColumn( {name: header.question});
});


//table.commit();

data?.assignedPatients?.map((patient) => {

  var cells=[patient.patientName,patient.startDate,patient.completeDate,patient.completed];
  patient.questionWithAnswers?.map((item) => {
    cells.push(item.answers);
  });

  table.addRow(cells);
});

table.commit();


sheet.columns.forEach(function (column, i) {
  let maxLength = 0;
  column["eachCell"]({ includeEmpty: true }, function (cell) {
      var columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength ) {
          maxLength = columnLength;
      }
  });
  column.width = maxLength < 10 ? 10 : maxLength;
});

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = surveyName+"_PatientResponses.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
}

export default generateAndDownloadExcelFile;