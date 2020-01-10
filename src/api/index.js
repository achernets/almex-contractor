const { URL, API } = window.SERVER;

const MrkClientServiceClient = new window.MrkClientServiceClient(
  new window.Thrift.Protocol(
    new window.Thrift.Transport(`${URL}/${API}/thrift/mrk-client-json`)
  )
);

export {
  MrkClientServiceClient
};