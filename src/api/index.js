let MrkClientServiceClient = null;

const setThrift = async ({ THRIFT }) => {
  MrkClientServiceClient = new window.MrkClientServiceClient(
    new window.Thrift.Protocol(
      new window.Thrift.Transport(`${THRIFT.URL}/${THRIFT.API}/thrift/mrk-client-json`)
    )
  );
};

export {
  setThrift,
  MrkClientServiceClient
};