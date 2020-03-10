//export const ATTACHMENT_ACCEPT = '.pdf, .odt, .txt, .rtf, .doc, .docx, .xls, .xlsx';
export const ONLY_OFFICE_TEXT = ['doc', 'docm', 'docx', 'dot', 'dotm', 'dotx', 'epub', 'fodt', 'htm', 'html', 'mht', 'odt', 'ott', 'pdf', 'rtf', 'txt', 'djvu', 'xps'];
export const ONLY_OFFICE_SPREADSHEET = ['csv', 'fods', 'ods', 'ots', 'xls', 'xlsm', 'xlsx', 'xlt', 'xltm', 'xltx'];
export const ONLY_OFFICE_PRESENTATION = ['fodp', 'odp', 'otp', 'pot', 'potm', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx'];
export const ATTACHMENT_ACCEPT = [...ONLY_OFFICE_TEXT, ...ONLY_OFFICE_SPREADSHEET, ...ONLY_OFFICE_PRESENTATION].map(item => `.${item}`).join(', ');