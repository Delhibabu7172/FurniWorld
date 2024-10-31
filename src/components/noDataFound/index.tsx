import noDataImg from "../../assets/images/NoData/No data-pana.svg"

function NoDataFound() {
  return (
    <div className='py-5 mx-auto'>
    <img src={noDataImg} className='w-32 mx-auto' alt="No Image" />
    <p className='mt-2 text-sm text-center'>No Data Found</p>
</div>
  )
}

export default NoDataFound