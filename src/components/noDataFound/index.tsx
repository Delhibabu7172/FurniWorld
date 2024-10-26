import noDataImg from "../../assets/images/home/advertisement1/Background.svg"

function NoDataFound() {
  return (
    <div className='mx-auto py-5'>
    <img src={noDataImg} className='w-32 mx-auto' alt="No Image" />
    <p className='text-sm text-center mt-2'>No Data Found</p>
</div>
  )
}

export default NoDataFound